import React, { FormEvent, useEffect, useState } from 'react'
import { gather } from '../api/api'

interface IMediaIdentifier {
    store: any
}

const MediaIdentifier = (_: IMediaIdentifier) => {
    const [gatherLink, setGatherLink] = useState('')
    const submit = (e: FormEvent) => {
        e.preventDefault()
        gather(gatherLink)
    }

    return (
        <div className="container">
            <h1>Find Media</h1>

            <form onSubmit={submit}>
                <div className="row mb-3">
                    <label className="col-sm-2 col-form-label">Location</label>
                    <div className="col-sm-10">
                        <input
                            className="form-control"
                            value={gatherLink}
                            onChange={(e) => setGatherLink(e.target.value)}
                        />
                    </div>
                </div>

                <fieldset>
                    <div className="row mb-3">
                        <legend className="col-form-label col-sm-2 pt-0">Providers</legend>
                        <div className="col-sm-10">
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="providers"
                                    id="gridRadios1"
                                    value="option1"
                                    defaultChecked={true}
                                />
                                <label className="form-check-label" htmlFor="gridRadios1">
                                    <i className="fas fa-youtube" /> YT
                                </label>
                            </div>
                            <div className="form-check disabled">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="providers"
                                    id="gridRadios3"
                                    value="option3"
                                    disabled
                                />
                                <label className="form-check-label" htmlFor="gridRadios3">
                                    // TODO: add more
                                </label>
                            </div>
                        </div>
                    </div>
                </fieldset>
                <div className="row mb-3">
                    <div className="col-form-label col-sm-2 pt-0">Format</div>
                    <div className="col-sm-10">
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="format" defaultChecked={true} />
                            <label className="form-check-label" htmlFor="format">
                                Audio only
                            </label>
                        </div>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">
                    <i className="fas fa-search" /> Find
                </button>
            </form>
        </div>
    )
}

export default MediaIdentifier
