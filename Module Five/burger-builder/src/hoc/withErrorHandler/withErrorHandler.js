import React from "react";
import Modal from "../../Components/UI/Modal/Modal";
import Aux from "../Aux/Aux";

const withErrorHandler = (WrappedComponent, axios) => {
	return class extends React.Component {
		state = {
			error: null,
		};
		componentDidMount() {
			this.requestInterceptor = axios.interceptors.request.use((req) => {
				this.setState({ error: null });
				return req;
			});
			this.responseInterceptor = axios.interceptors.response.use(
				null,
				(error) => {
					this.setState({ error: error });
					return Promise.error(error);
				}
			);
		}

		componentWillUnmount() {
			/* console.log(
				"Will Unmount",
				this.requestInterceptor,
				this.responseInterceptor
			); */
			axios.interceptors.response.eject(this.responseInterceptor);
			axios.interceptors.request.eject(this.requestInterceptor);
		}

		errorConfirmedHandler() {
			this.setState({ error: null });
		}

		render() {
			return (
				<Aux>
					<Modal
						show={this.state.error}
						modalClosed={this.errorConfirmedHandler}
					>
						{this.state.error ? this.state.error.message : null}
					</Modal>
					<WrappedComponent {...this.props} />
				</Aux>
			);
		}
	};
};

export default withErrorHandler;
