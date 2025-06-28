import React from 'react'
import { Table } from 'react-bootstrap'

function ModuleTable({ modules, handleRemove }) {
    return (
        <Table responsive striped hover className='rounded overflow-hidden shadow'>
            <thead>
                <tr>
                    <th>Module Title</th>
                    <th>Credit</th>
                    <th>Grade</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {modules.map((module, index) => (
                    <tr key={index}>
                        <td className=''>{module.moduleTitle}</td>
                        <td>{module.credit}</td>
                        <td>{module.grade}</td>
                        <td>
                            <i className="bi bi-x-lg removeIcon" onClick={() => handleRemove(index)}></i>
                        </td>
                    </tr>
                ))}

            </tbody>
        </Table>
    )
}

export default ModuleTable