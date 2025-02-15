'use client';

import { useState } from 'react';

interface Product {
  name: string;
  tagline: string;
  description: string;
  url: string;
  website?: string;
  votesCount: number;
  createdAt: string;
  topics: string[];
}

interface ResearchResult {
  content: string;
  keywords: string[];
  products: Product[];
}

export default function Home() {
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ResearchResult | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://localhost:3001/api/research', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ topic }),
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Error:', error);
      setResult(null);
      alert('抱歉，请求失败，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-8 flex flex-col items-center justify-center">
      <div className="w-full max-w-3xl">
        {!result ? (
          <div className="text-center space-y-8 transition-all duration-500 ease-out transform opacity-100 translate-y-0">
            <div className="space-y-4">
              <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">Product Research</h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">利用 AI 和 ProductHunt 数据，快速洞察市场趋势和竞品分析</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="text-blue-600 text-xl font-semibold mb-2">市场洞察</div>
                <p className="text-gray-600">深入分析市场趋势和用户需求，发现产品机会</p>
              </div>
              <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="text-blue-600 text-xl font-semibold mb-2">竞品分析</div>
                <p className="text-gray-600">全面了解竞争对手的优势和不足，找到差异化定位</p>
              </div>
              <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="text-blue-600 text-xl font-semibold mb-2">AI 赋能</div>
                <p className="text-gray-600">借助 GPT-4 智能分析，提供专业的产品建议</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 max-w-xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="输入你想研究的产品主题，例如：AI 写作、智能获客..."
                  className="w-full p-4 pr-36 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm text-lg"
                  required
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="absolute right-2 top-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors duration-200 text-lg font-medium"
                >
                  {loading ? '分析中...' : '开始研究'}
                </button>
              </div>
              <p className="text-sm text-gray-500 text-center">通常分析需要 15-30 秒完成</p>
            </form>
          </div>
        ) : (
          <div className="space-y-8 transition-all duration-500 ease-out transform opacity-100">
            <button
              onClick={() => setResult(null)}
              className="inline-flex items-center px-4 py-2 text-sm text-blue-600 hover:text-blue-700 transition-colors"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              返回搜索
            </button>
            
            <div className="bg-white shadow-lg rounded-xl p-8 border border-gray-100">
              <h2 className="text-3xl font-bold mb-6 text-gray-900">GPT 分析报告</h2>
              <div className="prose prose-lg max-w-none text-gray-700 whitespace-pre-wrap">{result?.content}</div>
            </div>

            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900">相关产品</h2>
              <div className="grid grid-cols-1 gap-6">
                {result?.products?.map((product, index) => (
                  <div 
                    key={index} 
                    className="bg-white shadow-lg rounded-xl p-6 border border-gray-100 transition-all duration-500 ease-out transform opacity-100 translate-y-0"
                    style={{
                      transitionDelay: `${index * 100}ms`
                    }}
                  >
                    <h3 className="text-2xl font-bold mb-2 text-gray-900">{product.name}</h3>
                    <p className="text-lg text-gray-600 mb-4">{product.tagline}</p>
                    <p className="text-gray-700 mb-6 leading-relaxed">{product.description}</p>
                    <div className="flex gap-4">
                      <a
                        href={product.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-blue-600 hover:text-blue-700 transition-colors"
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        在 ProductHunt 上查看
                      </a>
                      {product.website && (
                        <a
                          href={product.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-blue-600 hover:text-blue-700 transition-colors"
                        >
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                          </svg>
                          访问网站
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
