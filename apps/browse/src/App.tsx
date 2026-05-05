import './index.css'

function App() {
  return (
    <div className="min-h-screen bg-warm-white flex items-center justify-center">
      <div className="notion-card max-w-md">
        <h1 className="text-2xl font-bold text-notion-black mb-4">
          Open Zread Wiki Preview
        </h1>
        <p className="text-warm-gray-500 mb-6">
          本地 Wiki 文档预览服务器，使用 Notion 设计风格。
        </p>
        <button className="notion-button-primary">
          开始浏览
        </button>
      </div>
    </div>
  )
}

export default App