import React, { Component } from "react";
import Loading from "components/Loading";

class UserData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      data: "",
      hasMore: true,
      nextDataPage: 2,
    };
    this.fetchData = this.fetchData.bind(this);
  }

  componentDidMount() {
    this.setState({
      loading: true,
    });
    this.fetchData(this.props.data);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.data !== this.props.data) {
      this.setState({
        loading: true,
        display: false,
      });
      this.fetchData(this.props.data);
    }
  }

  fetchData(data_url) {
    this.setState({
      loading: true,
      display: false,
    });
    setTimeout(() => {
      fetch(data_url)
        .then((response) => response.json())
        .then((data) =>
          this.setState({
            loading: false,
            display: true,
            data,
          })
        )
        .catch(function (error) {
          console.log(error);
        });
    }, 500);
  }

  fetchMoreData() {
    if (this.state.hasMore === true) {
      let num = this.state.nextDataPage;
      setTimeout(() => {
        fetch(`${this.props.data}?page=${num}`)
          .then((response) => response.json())
          .then((data) => {
            if (data.length > 0) {
              this.setState((prevState) => ({
                hasMore: true,
                nextDataPage: num + 1,
                data: prevState.data.concat(data),
              }));
            } else {
              this.setState({
                hasMore: false,
                nextDataPage: 2,
              });
            }
          });
      }, 500);
    }
  }

  render() {
    return <div></div>;
  }
}

export default UserData;
