import React, { Component } from 'react';
import {connect} from 'react-redux';


class StoreList extends Component {
	render() {
		console.log(this.props.stores)
		return;
	}
}

const mapStateToProps = state => {
	return {stores: state.stores}
}

export default connect(mapStateToProps)(StoreList);
