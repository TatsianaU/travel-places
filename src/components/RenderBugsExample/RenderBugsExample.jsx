import './RenderBugsExample.css'

import { useRef, useState } from 'react'

function PlusThreeBug() {
  const [brokenCount, setBrokenCount] = useState(0)
  const [fixedCount, setFixedCount] = useState(0)

  function handleBrokenPlusThree() {
    setBrokenCount(brokenCount + 1)
    setBrokenCount(brokenCount + 1)
    setBrokenCount(brokenCount + 1)
  }

  // State в обработчике — snapshot текущего рендера; три setCount(count + 1)
  // видят одно и то же значение. Для цепочки от предыдущего нужен functional updater.
  function handleFixedPlusThree() {
    setFixedCount((prev) => prev + 1)
    setFixedCount((prev) => prev + 1)
    setFixedCount((prev) => prev + 1)
  }

  return (
    <section className="render-bugs-section">
      <h3 className="render-bugs-section-title">1. +3 превращается в +1</h3>

      <div className="render-bugs-columns">
        <div className="render-bugs-column render-bugs-column--broken">
          <h4 className="render-bugs-column-title">Сломано</h4>
          <dl className="render-model-readout">
            <dt>count</dt>
            <dd>{brokenCount}</dd>
          </dl>
          <button
            type="button"
            onClick={handleBrokenPlusThree}
          >
            +3
          </button>
        </div>

        <div className="render-bugs-column render-bugs-column--fixed">
          <h4 className="render-bugs-column-title">Исправлено</h4>
          <dl className="render-model-readout">
            <dt>count</dt>
            <dd>{fixedCount}</dd>
          </dl>
          <button
            type="button"
            onClick={handleFixedPlusThree}
          >
            +3
          </button>
        </div>
      </div>
    </section>
  )
}

function MutationBug() {
  const [brokenProfile] = useState({ name: 'Ada', age: 20 })
  const [tick, setTick] = useState(0)
  const [fixedProfile, setFixedProfile] = useState({ name: 'Ada', age: 20 })

  function handleMutate() {
    brokenProfile.age += 1
  }

  function handleForceRender() {
    setTick((prev) => prev + 1)
  }

  // State нельзя мутировать напрямую: React не видит новую ссылку и не делает render.
  // Нужно передать через setter новый объект (например, через spread).
  function handleImmutableUpdate() {
    setFixedProfile((prev) => ({ ...prev, age: prev.age + 1 }))
  }

  return (
    <section className="render-bugs-section">
      <h3 className="render-bugs-section-title">2. Прямая мутация объекта</h3>

      <div className="render-bugs-columns">
        <div className="render-bugs-column render-bugs-column--broken">
          <h4 className="render-bugs-column-title">Сломано</h4>
          <dl className="render-model-readout">
            <dt>age</dt>
            <dd>{brokenProfile.age}</dd>
            <dt>соседний tick</dt>
            <dd>{tick}</dd>
          </dl>
          <div className="render-bugs-actions">
            <button
              type="button"
              onClick={handleMutate}
            >
              Мутировать age
            </button>
            <button
              type="button"
              onClick={handleForceRender}
            >
              Вызвать render (tick)
            </button>
          </div>
        </div>

        <div className="render-bugs-column render-bugs-column--fixed">
          <h4 className="render-bugs-column-title">Исправлено</h4>
          <dl className="render-model-readout">
            <dt>age</dt>
            <dd>{fixedProfile.age}</dd>
          </dl>
          <button
            type="button"
            onClick={handleImmutableUpdate}
          >
            Увеличить age
          </button>
        </div>
      </div>
    </section>
  )
}

function DelayedReadBug() {
  const [brokenCount, setBrokenCount] = useState(0)
  const [brokenDelayed, setBrokenDelayed] = useState(null)

  const [fixedCount, setFixedCount] = useState(0)
  const [fixedDelayed, setFixedDelayed] = useState(null)
  const fixedCountRef = useRef(fixedCount)
  fixedCountRef.current = fixedCount

  function handleBrokenDelayedRead() {
    setBrokenDelayed(null)
    setTimeout(() => setBrokenDelayed(brokenCount), 3000)
  }

  // Callback замыкает snapshot; ref хранит актуальное значение между рендерами,
  // поэтому отложенное чтение видит свежий count, а не count рендера «Старт».
  function handleFixedDelayedRead() {
    setFixedDelayed(null)
    setTimeout(() => setFixedDelayed(fixedCountRef.current), 3000)
  }

  return (
    <section className="render-bugs-section">
      <h3 className="render-bugs-section-title">3. Устаревшее значение в setTimeout</h3>

      <div className="render-bugs-columns">
        <div className="render-bugs-column render-bugs-column--broken">
          <h4 className="render-bugs-column-title">Сломано</h4>
          <dl className="render-model-readout">
            <dt>текущий count</dt>
            <dd>{brokenCount}</dd>
            <dt>setTimeout увидел</dt>
            <dd>{brokenDelayed === null ? '—' : brokenDelayed}</dd>
          </dl>
          <div className="render-bugs-actions">
            <button
              type="button"
              onClick={() => setBrokenCount((prev) => prev + 1)}
            >
              +1 к count
            </button>
            <button
              type="button"
              onClick={handleBrokenDelayedRead}
            >
              Старт таймера (3с)
            </button>
          </div>
        </div>

        <div className="render-bugs-column render-bugs-column--fixed">
          <h4 className="render-bugs-column-title">Исправлено</h4>
          <dl className="render-model-readout">
            <dt>текущий count</dt>
            <dd>{fixedCount}</dd>
            <dt>setTimeout увидел</dt>
            <dd>{fixedDelayed === null ? '—' : fixedDelayed}</dd>
          </dl>
          <div className="render-bugs-actions">
            <button
              type="button"
              onClick={() => setFixedCount((prev) => prev + 1)}
            >
              +1 к count
            </button>
            <button
              type="button"
              onClick={handleFixedDelayedRead}
            >
              Старт таймера (3с)
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function RenderBugsExample() {
  return (
    <div className="render-bugs-example">
      <header className="render-bugs-header">
        <h2 className="render-bugs-title">Три бага модели рендера</h2>
        <p className="render-bugs-intro">
          Учебный стенд: слева сломанное поведение, справа исправление. Разницу видно по кликам.
        </p>
      </header>

      <PlusThreeBug />
      <MutationBug />
      <DelayedReadBug />
    </div>
  )
}
