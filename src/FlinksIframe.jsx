import React from "react";
import { Button, Col, Modal, ModalBody, ModalFooter } from "reactstrap";
import { ClipLoader } from "react-spinners";

export class FlinksIframe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }

  hideSpinner = () => {
    this.setState({
      loading: false
    });
  };

  shouldComponentUpdate(nextProps, nextState) {
    return !nextState.loading;
  }

  render() {
    let setLoginId = this.props.setLoginId;
    let setAccountId = this.props.setAccountId;
    window.addEventListener("message", function(e) {
      if (e.data.step === "REDIRECT") {
        setLoginId(e.data);
      }
      if (e.data.step === "ACCOUNT_SELECTED") {
        setAccountId(e.data);
      }
    });
    return (
      <React.Fragment>
        {this.state.loading ? (
          <div
            className="position-absolute"
            style={{ left: "45%", top: "45%" }}
          >
            <Col>
              <ClipLoader size={60} loading color="primary" />
            </Col>
          </div>
        ) : null}
        <iframe
          title="verifyBank"
          className="modal_flinks"
          src="https://toolbox-iframe.private.fin.ag/?theme=light&desktopLayout=true&fixedHeightEnable=false&institutionFilterEnable=true&demo=true&consentEnable=true&accountSelectorEnable=true"
          onLoad={this.hideSpinner}
        />
      </React.Fragment>
    );
  }
}

export const FlinksModal = props => {
  return (
    <Modal
      isOpen={props.Iframe}
      toggle={props.connectBank}
      size="lg"
      className="modal-flinks"
    >
      <div className="modal-header">
        <button
          type="button"
          className="close"
          data-dismiss="modal"
          aria-label="Close"
          onClick={props.connectBank}
        >
          <span aria-hidden="true">×</span>
        </button>
      </div>
      <ModalBody className="justify-content-center">
        <FlinksIframe
          setLoginId={props.setLoginId}
          setAccountId={props.setAccountId}
        />
      </ModalBody>
      <ModalFooter className="justify-content-end">
        <div>
          <Button
            color="primary"
            type="button"
            className="btn pull-right"
            size="md"
            onClick={props.submit}
            disabled={props.hasDanger}
          >
            Confirm Bank Setup
          </Button>
        </div>
      </ModalFooter>
    </Modal>
  );
};
