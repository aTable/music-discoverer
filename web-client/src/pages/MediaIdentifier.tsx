import React, { FormEvent, useEffect, useState } from 'react'
import { gather } from '../api/api'

interface IMediaIdentifier {
    store: any
}

const MediaIdentifier = (_: IMediaIdentifier) => {
    const [gatherLink, setGatherLink] = useState('https://www.youtube.com/watch?v=_s9d1Bd-JPA')
    const submit = (e: FormEvent) => {
        e.preventDefault()
        gather(gatherLink)
    }

    return (
        <div className="container">
            <h1>Find Media</h1>

            <form onSubmit={submit}>
                <input placeholder="Vid link" value={gatherLink} onChange={e => setGatherLink(e.target.value)} />
                <button className="btn btn-primary" type="submit">
                    Find!
                </button>
            </form>
        </div>
    )
}

export default MediaIdentifier
