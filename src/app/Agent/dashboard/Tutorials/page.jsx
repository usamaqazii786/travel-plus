import React, { useEffect, useState } from 'react'
import TaskItem from '../Website/TaskItem'
import { getAllTutorialsagent } from '../../../../utils/Services/TutorialsServices'

export default function Tutorials() {
  const [Tutorial, setTutorials] = useState([])
  console.log(Tutorial)
  const [, setloading] = useState(false)

  useEffect(() => {
    getAllTutorialsagent(setTutorials, setloading)
  }, [])

  return (
    <div>
      <h1 className="text-center">TUTORIALS</h1>
      <div className="d-flex justify-content-center mb-2">
        <iframe
          width="741"
          height="417"
          src="https://www.youtube.com/embed/g6rSfYkBtYU"
          title="Travel+ CRM Overview"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen></iframe>
      </div>
      <div className="kanban-board">
        <div className="pt-1 d-flex justify-content-between flex-wrap">
          {Tutorial?.map((e) => {
            return <TaskItem title={e?.title} vedio={e?.video} />
          })}
        </div>
      </div>
    </div>
  )
}
