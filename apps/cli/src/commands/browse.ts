import express, { Request, Response } from 'express'
import getPort from 'get-port'
import open from 'open'
import path from 'path'
import { existsSync } from 'fs'

export async function runBrowse() {
  const app = express()

  // API 路由占位（后续扩展）
  app.get('/api/wiki/list', (_req: Request, res: Response) => {
    res.json({ files: [] })
  })

  app.get('/api/wiki/content/:path', (req: Request, res: Response) => {
    res.json({ content: '', path: req.params.path })
  })

  // 生产环境：静态文件服务
  const webDistPath = path.join(__dirname, '../browse')
  if (existsSync(webDistPath)) {
    app.use(express.static(webDistPath))
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(webDistPath, 'index.html'))
    })
  } else {
    console.log('\n⚠️  未找到前端打包文件')
    console.log('开发环境请单独运行: bun run dev --filter=browse')
    console.log('生产环境请先打包: bun run build --filter=browse\n')
  }

  // 动态端口探测
  const port = await getPort({ port: 3000 })
  app.listen(port, () => {
    console.log(`\n🌐 Server running at http://localhost:${port}\n`)
    if (existsSync(webDistPath)) {
      open(`http://localhost:${port}`)
    }
  })
}