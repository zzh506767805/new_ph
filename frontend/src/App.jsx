import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [topic, setTopic] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const [progress, setProgress] = useState({
    currentStage: 0, // 0: 生成关键词, 1: 搜索产品, 2: 分析报告
    keywords: [],
    currentKeyword: '',
    productsCount: 0,
    products: [],
    startTime: null
  })

  const exampleTopics = [
    'AI助手工具',
    '远程办公软件',
    '项目管理工具',
    '设计协作平台',
    '数据分析工具'
  ]

  // 模拟进度更新
  useEffect(() => {
    if (loading) {
      const timer1 = setTimeout(() => {
        setProgress(prev => ({
          ...prev,
          currentStage: 1
        }))
      }, 3000)

      const timer2 = setTimeout(() => {
        setProgress(prev => ({
          ...prev,
          currentStage: 2
        }))
      }, 6000)

      return () => {
        clearTimeout(timer1)
        clearTimeout(timer2)
      }
    }
  }, [loading])

  const handleTopicClick = (topic) => {
    setTopic(topic)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!topic) return

    setLoading(true)
    setError(null)
    setResult(null)
    setProgress({
      currentStage: 0,
      keywords: [],
      currentKeyword: '',
      productsCount: 0,
      products: [],
      startTime: Date.now()
    })

    try {
      const response = await fetch('http://localhost:3001/api/research', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ topic })
      })

      const data = await response.json()
      if (!response.ok) throw new Error(data.message || '请求失败')
      
      setProgress(prev => ({
        ...prev,
        currentStage: 2,
        keywords: data.keywords || [],
        products: data.products || []
      }))
      setResult({
        ...data,
        content: data.content.replace(/\n/g, '<br/>').replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container">
      <h1>AI产品研究助手</h1>
      
      {!loading && !result && (
        <div className="intro-section">
          <p className="intro-title">🚀 智能产品研究，让创新更简单</p>
          <p className="intro-description">输入你感兴趣的产品主题，AI助手将帮你深入分析相关产品的特点、趋势和市场情况。</p>
          <p>快速开始，试试这些热门主题：</p>
          <div className="example-topics">
            {exampleTopics.map((topic, index) => (
              <span
                key={index}
                className="example-topic"
                onClick={() => handleTopicClick(topic)}
              >
                {topic}
              </span>
            ))}
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="输入产品主题"
          disabled={loading}
        />
        <button type="submit" disabled={loading}>
          {loading ? '研究中...' : '开始研究'}
        </button>
      </form>

      {loading && (
        <div className="progress-section">
          <div className="progress-step">
            <h3>{progress.currentStage === 0 ? '正在生成关键词...' : 
                 progress.currentStage === 1 ? '正在搜索相关产品...' : 
                 '正在生成分析报告...'}</h3>
            <p className="progress-hint">研究预计在1分钟后完成，去喝杯水或发会呆吧 ☕️</p>
            <div className="progress-stages">
              <div className={`progress-stage ${progress.currentStage >= 0 ? 'active' : ''}`}>
                <div className="stage-dot"></div>
              </div>
              <div className={`progress-stage ${progress.currentStage >= 1 ? 'active' : ''}`}>
                <div className="stage-dot"></div>
              </div>
              <div className={`progress-stage ${progress.currentStage >= 2 ? 'active' : ''}`}>
                <div className="stage-dot"></div>
              </div>
            </div>
            {progress.keywords.length > 0 && (
              <div className="keywords-list">
                <h4>已生成的关键词：</h4>
                {progress.keywords.map((keyword, index) => (
                  <span
                    key={index}
                    className={`keyword-tag ${keyword === progress.currentKeyword ? 'active' : ''}`}
                  >
                    {keyword}
                    <span className="status-icon" />
                  </span>
                ))}
              </div>
            )}

          </div>
        </div>
      )}

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {result && (
        <div className="result-section">
          <h2>研究报告</h2>
          {result.keywords && result.keywords.length > 0 && (
            <div className="keywords-section">
              <h3>相关关键词</h3>
              <div className="keywords-list">
                {result.keywords.map((keyword, index) => (
                  <span key={index} className="keyword-tag">{keyword}</span>
                ))}
              </div>
            </div>
          )}
          {progress.products.length > 0 && (
            <div className="products-grid">
              {progress.products
                .sort((a, b) => b.votesCount - a.votesCount)
                .map((product, index) => (
                  <div key={index} className="product-card">
                    <h3>{product.name}</h3>
                    <div className="tagline">{product.tagline}</div>
                    <div className="description">{product.description}</div>
                    <div className="meta">
                      <span className="votes">👍 {product.votesCount}</span>
                      <span className="date">{new Date(product.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div className="links">
                      <a href={product.website} target="_blank" rel="noopener noreferrer" className="website-link">访问网站</a>
                      <a href={product.url} target="_blank" rel="noopener noreferrer" className="ph-link">ProductHunt页面</a>
                    </div>
                    {product.topics && product.topics.length > 0 && (
                      <div className="topics">
                        {product.topics.map((topic, i) => (
                          <span key={i} className="topic-tag">{topic}</span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
            </div>
          )}
          <div className="analysis-content" dangerouslySetInnerHTML={{ __html: result.content }} />
        </div>
      )}
    </div>
  )
}

export default App
