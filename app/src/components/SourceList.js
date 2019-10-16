import React from "react";
import { VirtualizedList, Dimensions } from "react-native";
import Source from "../components/Source";

const WIDTH = Dimensions.get("window").width;

class SourceList extends React.Component {
  renderSource = ({ item }) => {
    const { selectedSource, onSourcePress } = this.props;
    return (
      <Source
        source={item}
        selected={item.id === selectedSource}
        onPress={() =>
          typeof onSourcePress === "function" ? onSourcePress(item) : null
        }
      />
    );
  };

  getItem = (data, index) => data.get(index);

  getItemCount = data => data.size;

  render() {
    const { sources } = this.props;
    return (
      <VirtualizedList
        data={sources}
        renderItem={this.renderSource}
        getItem={this.getItem}
        getItemCount={this.getItemCount}
        contentContainerStyle={{ width: WIDTH }}
      />
    );
  }
}

export default SourceList;
