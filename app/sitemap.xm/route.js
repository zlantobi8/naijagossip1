import { readFileSync } from 'fs'
import { join } from 'path'

export async function GET() {
  const filePath = join(process.cwd(), 'public', 'sitemap.xml')
  const file = readFileSync(filePath, 'utf8')

  return new Response(file, {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
}
