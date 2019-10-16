import React, { Component } from "react";
import Navigation from "../components/Navigation";
import ImageUploader from "react-images-upload";
import Footer from "../components/Footer";
import { connect } from "react-redux";
import {
  loadDateNights,
  createDateNight,
  deleteDateNight
} from "../apis/dateNights";
import { BeatLoader } from "react-spinners";
import FirebaseImage from "../components/FirebaseImage";

const Event = props => <div />;

const initialDateNight = {
  name: "",
  description: "",
  price: "",
  coverImage: null
};

class HomeScreen extends Component {
  constructor() {
    super();
    this.state = {
      dateNight: initialDateNight,
      picture: null,
      events: [],
      coverImage: null
    };
    this.onDrop = this.onDrop.bind(this);
  }

  componentWillMount() {
    window.scrollTo(0, 0);
  }

  componentDidMount() {
    this.props.loadDateNights();
  }

  onDrop(picture) {
    this.setState({ picture: picture[0] });
  }

  onSubmit = () => {
    this.setState({ picture: null });
    this.props.createDateNight(this.state.dateNight, this.state.picture);
  };

  onDelete = () => {
    this.props.deleteDateNight(this.state.dateNight.id);
    this.setState({ dateNight: initialDateNight });
  };

  render() {
    return (
      <div className="timeSheet" style={{ backgroundColor: "#f2f5fc" }}>
        <Navigation />
        <input
          className={"button center"}
          type={"button"}
          style={{ margin: 10, marginBottom: 0 }}
          onClick={this.login}
          value={"Add New"}
        />
        <div className="side-by-side">
          <div className="side" style={{ backgroundColor: "#f2f5fc" }}>
            <div className="date-night-list">
              {this.props.dateNights.isLoading && (
                <div
                  style={{
                    display: "flex",
                    flex: 1,
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <BeatLoader
                    color={"#000"}
                    className={"date-night-list-loader"}
                  />
                </div>
              )}
              {(this.props.dateNights.data || []).map(dateNight => (
                <div
                  className={"date-night-item"}
                  key={dateNight.id}
                  onClick={() => this.setState({ dateNight })}
                >
                  <p style={{ fontWeight: "bold" }}>{dateNight.name}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="side" style={{ backgroundColor: "#f2f5fc" }}>
            {this.state.dateNight.coverImage && (
              <FirebaseImage
                path={this.state.dateNight.coverImage}
                style={{ marginBottom: 10, maxWidth: 300 }}
              />
            )}
            <input
              className={"textInput"}
              style={{ marginBottom: 10, padding: 5 }}
              type={"text"}
              onChange={e =>
                this.setState({
                  dateNight: { ...this.state.dateNight, name: e.target.value }
                })
              }
              value={this.state.dateNight.name}
              placeholder={"Name"}
            />
            <textarea
              className={"textInput"}
              style={{
                marginBottom: 10,
                padding: 5,
                width: "90%",
                minHeight: 100,
                resize: "none"
              }}
              onChange={e =>
                this.setState({
                  dateNight: {
                    ...this.state.dateNight,
                    description: e.target.value
                  }
                })
              }
              value={this.state.dateNight.description}
              placeholder={"Description"}
            />
            <input
              className={"textInput"}
              style={{ marginBottom: 10, padding: 5 }}
              type={"text"}
              onChange={e =>
                this.setState({
                  dateNight: { ...this.state.dateNight, price: e.target.value }
                })
              }
              value={this.state.dateNight.price}
              placeholder={"Price"}
            />
            <ImageUploader
              withIcon={true}
              buttonText="Choose images"
              onChange={this.onDrop}
              imgExtension={[".jpg", ".gif", ".png", ".gif"]}
              maxFileSize={5242880}
              withPreview={true}
            />
            {this.state.events.map(event => (
              <Event {...event} />
            ))}
            <input
              className={"button"}
              type={"button"}
              style={{ marginBottom: 10 }}
              onClick={this.login}
              value={"Add Event"}
            />
            <input
              className={"button"}
              type={"button"}
              style={{ marginBottom: 10 }}
              onClick={this.onSubmit}
              value={"Submit"}
            />
            {this.state.dateNight.id && (
              <input
                className={"button"}
                type={"button"}
                style={{ marginBottom: 10 }}
                onClick={this.onDelete}
                value={"Delete"}
              />
            )}
          </div>
        </div>
        {/*<Footer />*/}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    dateNights: state.dateNights
  };
};

const mapDispatchToProps = dispatch => {
  return {
    submitDateNight: dateNight => dispatch(),
    loadDateNights: () => dispatch(loadDateNights()),
    createDateNight: (dateNight, picture) =>
      dispatch(createDateNight(dateNight, picture)),
    deleteDateNight: dateNightId => dispatch(deleteDateNight(dateNightId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);
