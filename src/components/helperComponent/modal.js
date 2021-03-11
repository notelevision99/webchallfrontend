import React from 'react'

export default class Modal extends React.Component {
    render() {
        
        return (
            <>
                <div className="modal fade" id="exampleModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">{this.props.title}</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                {this.props.content}
                                <img src={this.props.urlImage} className="rounded mx-auto d-block img-thumbnail"/>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Đóng</button>
                                <button onClick={this.props.submit} type="button" className="btn btn-primary">Xác nhận</button>
                            </div>
                        </div>
                    </div>
                </div>

            </>
        )
    }
}
