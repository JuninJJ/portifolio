import { NextResponse } from 'next/server'
import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'

const DATA_FILE = join(process.cwd(), 'data', 'projects.json')

interface Project {
  id: string
  title: string
  description: string
  details?: string
  image?: string
  tags: string[]
  github?: string
  demo?: string
  createdAt: string
}

function readProjects(): Project[] {
  const raw = readFileSync(DATA_FILE, 'utf-8')
  return JSON.parse(raw)
}

function writeProjects(projects: Project[]) {
  writeFileSync(DATA_FILE, JSON.stringify(projects, null, 2))
}

export async function GET() {
  const projects = readProjects()
  return NextResponse.json(projects)
}

export async function POST(request: Request) {
  const secret = request.headers.get('x-api-secret')
  if (!secret || secret !== (process.env.PROJECTS_SECRET ?? 'dev-secret')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const body = await request.json()
  const projects = readProjects()
  const newProject: Project = {
    id: Date.now().toString(),
    title: body.title,
    description: body.description,
    details: body.details ?? '',
    image: body.image ?? '',
    tags: body.tags ?? [],
    github: body.github ?? '',
    demo: body.demo ?? '',
    createdAt: new Date().toISOString(),
  }
  projects.push(newProject)
  writeProjects(projects)
  return NextResponse.json(newProject, { status: 201 })
}

export async function DELETE(request: Request) {
  const secret = request.headers.get('x-api-secret')
  if (!secret || secret !== (process.env.PROJECTS_SECRET ?? 'dev-secret')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 })
  const projects = readProjects()
  writeProjects(projects.filter(p => p.id !== id))
  return NextResponse.json({ success: true })
}
