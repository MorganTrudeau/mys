import React, { useState } from "react";
import { TextField, Popper, Paper, MenuItem } from "@material-ui/core";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";

let popperNode = null;

const PlacesAutoCompleteInput = ({ key, value, onSelect, label }) => {
  const [address, setAddress] = useState(value);
  const handleChange = value => {
    onSelect(value);
    setAddress(value);
  };
  return (
    <PlacesAutocomplete
      key={key}
      value={address}
      onChange={handleChange}
      onSelect={handleChange}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => {
        return (
          <div>
            <TextField
              {...getInputProps({
                style: { width: "100%" },
                label,
                inputRef: ref => (popperNode = ref)
              })}
            />
            <div>
              {loading && <div>Loading...</div>}
              <Popper open={true} anchorEl={popperNode}>
                <Paper
                  square
                  style={{
                    marginTop: 8,
                    width: popperNode ? popperNode.clientWidth : undefined
                  }}
                >
                  {suggestions.map((suggestion, index) => (
                    <MenuItem
                      key={suggestion.label}
                      component="div"
                      {...getSuggestionItemProps(suggestion)}
                    >
                      {suggestion.description}
                    </MenuItem>
                  ))}
                </Paper>
              </Popper>
            </div>
          </div>
        );
      }}
    </PlacesAutocomplete>
  );
};

export default PlacesAutoCompleteInput;
