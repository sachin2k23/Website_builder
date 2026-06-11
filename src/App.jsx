import { useCallback, useEffect, useState } from 'react'
import DashboardLayout from './components/layout/DashboardLayout'
import Dashboard from './pages/Dashboard'
import SelectTemplate from './pages/SelectTemplate'
import Builder from './pages/Builder'
import { TEMPLATES } from './utils/templates'
import { getContentHeight } from './utils/editorGeometry'

const APP_STORAGE_KEY = 'akashaveda-builder-state-v1'
const defaultBuilderConfig = {
  projectId: null,
  elements: [],
  name: 'My Project',
  canvasSettings: null,
  builderState: null,
}

const cloneElements = elements => elements.map(element => ({
  ...element,
  breakpoints: element.breakpoints ? structuredClone(element.breakpoints) : undefined,
  children: element.children ? cloneElements(element.children) : [],
}))

const createProjectFromTemplate = (templateKey, overrides = {}) => {
  const template = TEMPLATES[templateKey] || TEMPLATES.blank
  const elements = cloneElements(template.elements || [])
  const canvasSettings = {
    width: 1200,
    height: getContentHeight(elements, 'desktop', 900),
    x: 0,
    y: 0,
    fill: '#ffffff',
    ...(template.canvasSettings || {}),
  }

  return {
    id: overrides.id ?? Date.now(),
    name: overrides.name ?? template.name,
    viewed: overrides.viewed ?? 'Viewed just now',
    badge: overrides.badge ?? null,
    lastViewedHours: overrides.lastViewedHours ?? 0,
    lastEditedHours: overrides.lastEditedHours ?? 0,
    archived: false,
    templateKey,
    elements,
    canvasSettings,
    ...overrides,
  }
}

const initialProjects = [
  createProjectFromTemplate('techSummitTemplate1', {
    id: 1,
    name: 'TechSummit Template 1',
    viewed: 'Viewed 10h ago',
    badge: 'FREE',
    lastViewedHours: 10,
    lastEditedHours: 18,
  }),
]

function loadSavedAppState() {
  if (typeof window === 'undefined') return null

  try {
    const saved = window.localStorage.getItem(APP_STORAGE_KEY)
    if (!saved) return null

    const parsed = JSON.parse(saved)
    if (!parsed || !Array.isArray(parsed.projects)) return null

    return {
      page: parsed.page === 'builder' ? 'builder' : 'dashboard',
      projects: parsed.projects,
      builderConfig: {
        ...defaultBuilderConfig,
        ...(parsed.builderConfig || {}),
      },
    }
  } catch (error) {
    console.warn('Could not load saved builder state', error)
    return null
  }
}

function saveAppState(nextState) {
  if (typeof window === 'undefined') return

  try {
    window.localStorage.setItem(APP_STORAGE_KEY, JSON.stringify(nextState))
  } catch (error) {
    console.warn('Could not save builder state', error)
  }
}

export default function App() {
  const [savedAppState] = useState(() => loadSavedAppState())
  const [page, setPage] = useState(() => savedAppState?.page || 'dashboard')
  const [projects, setProjects] = useState(() => savedAppState?.projects || initialProjects)
  const [builderConfig, setBuilderConfig] = useState(() => savedAppState?.builderConfig || defaultBuilderConfig)

  useEffect(() => {
    // Initialize theme from localStorage
    const savedTheme = localStorage.getItem('vc-theme') || 'light'
    document.documentElement.setAttribute('data-theme', savedTheme)

    window.history.replaceState({
      page,
      builderConfig,
    }, '')

    function handlePopState(event) {
      const nextState = event.state

      if (nextState?.page) {
        setPage(nextState.page)
        setBuilderConfig(nextState.builderConfig ?? defaultBuilderConfig)
        return
      }

      setPage('dashboard')
      setBuilderConfig(defaultBuilderConfig)
    }

    window.addEventListener('popstate', handlePopState)

    return () => {
      window.removeEventListener('popstate', handlePopState)
    }
  }, [])

  useEffect(() => {
    saveAppState({ page, projects, builderConfig })
  }, [page, projects, builderConfig])

  function navigateTo(nextPage, nextBuilderConfig = defaultBuilderConfig) {
    setPage(nextPage)
    setBuilderConfig(nextBuilderConfig)
    window.history.pushState({ page: nextPage, builderConfig: nextBuilderConfig }, '')
  }

  function handleTemplateSelect(templateKey) {
    const template = TEMPLATES[templateKey]
    if (!template) return

    const project = createProjectFromTemplate(templateKey, { id: Date.now() })
    const config = {
      projectId: project.id,
      elements: cloneElements(project.elements),
      name: project.name,
      canvasSettings: project.canvasSettings,
      templateKey: project.templateKey,
      builderState: null,
    }

    setProjects(currentProjects => [project, ...currentProjects])
    setBuilderConfig(config)
    setPage('builder')
    window.history.pushState({ page: 'builder', builderConfig: config }, '')
  }

  function handleOpenProject(projectId) {
    const project = projects.find(item => item.id === projectId)
    if (!project) return

    const config = {
      projectId: project.id,
      elements: cloneElements(project.elements || []),
      name: project.name,
      canvasSettings: project.canvasSettings,
      templateKey: project.templateKey,
      builderState: project.builderState || null,
    }

    setProjects(currentProjects =>
      currentProjects.map(item =>
        item.id === projectId
          ? { ...item, viewed: 'Viewed just now', lastViewedHours: 0 }
          : item,
      ),
    )
    navigateTo('builder', config)
  }

  const handleProjectChange = useCallback((projectId, changes) => {
    if (!projectId) return
    setProjects(currentProjects =>
      currentProjects.map(project =>
        project.id === projectId
          ? {
              ...project,
              ...changes,
              elements: changes.elements ? cloneElements(changes.elements) : project.elements,
              canvasSettings: changes.canvasSettings || project.canvasSettings,
              builderState: changes.builderState || project.builderState,
              viewed: 'Viewed just now',
              lastViewedHours: 0,
              lastEditedHours: 0,
            }
          : project,
      ),
    )
  }, [])

  const handleBuilderProjectChange = useCallback((changes) => {
    if (!builderConfig.projectId) return

    handleProjectChange(builderConfig.projectId, changes)

    if (changes.builderState) {
      const snapshot = changes.builderState

      setBuilderConfig(currentConfig => ({
        ...currentConfig,
        elements: cloneElements(snapshot.elements || []),
        canvasSettings: snapshot.canvasSettings,
        name: snapshot.name,
        builderState: snapshot,
      }))
    }
  }, [builderConfig.projectId, handleProjectChange])

  const handleBuilderSave = useCallback((snapshot) => {
    const nextBuilderConfig = {
      ...builderConfig,
      elements: cloneElements(snapshot.elements || []),
      canvasSettings: snapshot.canvasSettings,
      name: snapshot.name,
      builderState: snapshot,
    }

    const nextProjects = projects.map(project =>
      project.id === builderConfig.projectId
        ? {
            ...project,
            name: snapshot.name,
            elements: cloneElements(snapshot.elements || []),
            canvasSettings: snapshot.canvasSettings,
            builderState: snapshot,
            viewed: 'Viewed just now',
            lastViewedHours: 0,
            lastEditedHours: 0,
          }
        : project,
    )

    setBuilderConfig(nextBuilderConfig)
    setProjects(nextProjects)
    saveAppState({
      page: 'builder',
      projects: nextProjects,
      builderConfig: nextBuilderConfig,
    })
    window.history.replaceState({ page: 'builder', builderConfig: nextBuilderConfig }, '')
  }, [builderConfig, projects])

  function handleArchiveProject(projectId) {
    setProjects((currentProjects) =>
      currentProjects.map((project) =>
        project.id === projectId ? { ...project, archived: true } : project,
      ),
    )
    navigateTo('archive')
  }

  function handleUnarchiveProject(projectId) {
    setProjects((currentProjects) =>
      currentProjects.map((project) =>
        project.id === projectId ? { ...project, archived: false } : project,
      ),
    )
  }

  function handleDeleteProject(projectId) {
    setProjects((currentProjects) => currentProjects.filter((project) => project.id !== projectId))
  }

  function handleRenameProject(projectId, nextName) {
    setProjects((currentProjects) =>
      currentProjects.map((project) =>
        project.id === projectId ? { ...project, name: nextName } : project,
      ),
    )
  }

  return (
    <>
      {(page === 'dashboard' || page === 'archive') && (
        <DashboardLayout currentPage={page} onNavigate={navigateTo}>
          <Dashboard
            view={page}
            projects={projects}
            onNewProject={() => navigateTo('select-template')}
            onArchiveProject={handleArchiveProject}
            onUnarchiveProject={handleUnarchiveProject}
            onDeleteProject={handleDeleteProject}
            onRenameProject={handleRenameProject}
            onOpenProject={handleOpenProject}
          />
        </DashboardLayout>
      )}
      {page === 'select-template' && (
        <SelectTemplate
          onBack={() => navigateTo('dashboard')}
          onSelect={handleTemplateSelect}
        />
      )}
      {page === 'builder' && (
        <Builder
          initialElements={builderConfig.elements}
          initialCanvasSettings={builderConfig.canvasSettings}
          initialBuilderState={builderConfig.builderState}
          projectName={builderConfig.name}
          onProjectChange={handleBuilderProjectChange}
          onSave={handleBuilderSave}
          onBack={() => navigateTo('dashboard')}
        />
      )}
    </>
  )
}
