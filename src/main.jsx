import './index.css'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import App from './App.jsx'

// QueryClient - это менеджер кеша приложения
// 1. Хранит ответы серверных запросов в памяти
// 2. Знает, какие данные устарели, а какие актуальные
// 3. Умеет сам ходить за данными на сервер (refetch)
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Сколько времени данные считаются актуальными - пока этот срок не истек,
      // TanStack Query не ходит за ними заново
      staleTime: 30_000,

      // По умолчанию retry = 3. Количество попыток при неуспешном запросе
      retry: 1,

      // Отключаем обновление данных при переходе между вкладками браузера
      refetchOnWindowFocus: false,
    },
  },
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* QueryClientProvider делает queryClient доступным во всем дереве через хуки (useQuery, useMutation) */}
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>

      {/* Панель для просмотра кешей и состояний запросов */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>
)
