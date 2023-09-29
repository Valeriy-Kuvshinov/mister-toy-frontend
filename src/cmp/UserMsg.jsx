import { eventBusService } from "../services/event-bus.service.js"
import React, { useState, useEffect } from 'react'

export function UserMsg() {
    const [msg, setMsg] = useState(null)
    const [isActive, setIsActive] = useState(false)

    useEffect(() => {
        const unsubscribe = eventBusService.on('show-user-msg', newMsg => {
            setMsg(newMsg)
            setIsActive(true)
            setTimeout(() => {
                setIsActive(false)
                setTimeout(onCloseMsg, 800)
            }, 2500)
        })
        return () => {
            unsubscribe()
        }
    }, [])

    function onCloseMsg() {
        setMsg(null)
    }

    if (!msg) return null

    return (
        <section className={`user-msg ${msg.type} ${isActive ? 'active' : ''}`}>
            <p>{msg.txt}</p>
        </section>
    )
}