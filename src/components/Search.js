import { Button, Input, Stack, Box } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { ExpediaGET, ExpediaPOST } from "../lib/api/ExpediaAPI";
import ListingCard from "./ListingCard";
import { GeographyMap } from "../utils/GeographyMap";
import _, { identity } from "lodash";
import moment from "moment";

const LANGUAGE = "en-US";

/**
 * Search Bar Layout.
 */
const SearchBar = ({
  destination,
  setDestination,
  checkIn,
  setCheckIn,
  checkOut,
  setCheckOut,
  setPropertyIds,
  occupancy,
  setOccupancy,
  setSearchProperties,
  setSearchPropertiesInfo,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const handleSearch = async () => {
    setIsLoading(true);
    try {
      const targetRegionId = GeographyMap[destination];
      let targetBoundingPolygon = null;

      /* get Polygon Coordinate Boundary */
      let polygonCoordinateBoundary = await ExpediaGET(
        `regions/${targetRegionId}?language=${LANGUAGE}&include=details&include=property_ids&include=property_ids_expanded`
      ); // ...then(res => {
      // call the second api
      // res.coordinates.bounding_polygon
      //}

      targetBoundingPolygon = {
        ...polygonCoordinateBoundary.coordinates.bounding_polygon,
      };

      /* Return property_ids within Polygon Boundary */
      let propertyIdsResponse = await ExpediaPOST(
        `properties/geography?include=property_ids`,
        targetBoundingPolygon
      );

      setPropertyIds(propertyIdsResponse); // async

      /* get Polygon Coordinate Boundary */
      // [1,2,3,4] -> ['&property_id=1', '&']
      let propertyIdQuery = Object.keys(propertyIdsResponse)
        .slice(0, 249)
        .map((propertyId) => `&property_id=${propertyId}`)
        .join("");

      let propertyAvailability = await ExpediaGET(
        `properties/availability?checkin=${checkIn}&checkout=${checkOut}${propertyIdQuery}&currency=USD&language=${LANGUAGE}&country_code=US&occupancy=${occupancy}&sales_channel=website&sales_environment=hotel_only&rate_plan_count=1`
      );

      setSearchProperties(propertyAvailability);

      let propIdQueryString = propertyAvailability
        .map((property) => `&property_id=${property.property_id}`)
        .join("");
      let properties = await ExpediaGET(
        `properties/content?language=${LANGUAGE}&supply_source=expedia${propIdQueryString}`
      );
      setSearchPropertiesInfo(properties);
    } catch (err) {
      console.log(err);
    }

    setIsLoading(false);
  };

  const parseDate = (date) => {
    date = new Date(date);
    return moment(date).format("YYYY-MM-DD");
  };

  return (
    <Stack direction="row" align="center" justify="center">
      <Stack direction="row" spacing={2} align="center" justify="center">
        <Input
          placeholder="Destination"
          onChange={(event) => {
            setDestination(event.target.value);
          }}
        />
        <Input
          placeholder="Check In"
          type="date"
          onChange={(e) => {
            let dateVal = parseDate(e.target.value);
            setCheckIn(dateVal);
          }}
        />
        <Input
          placeholder="Check Out"
          type="date"
          onChange={(e) => {
            let dateVal = parseDate(e.target.value);
            setCheckOut(dateVal);
          }}
        />
        <Input
          placeholder="Travelers"
          onChange={(e) => {
            setOccupancy(e.target.value);
          }}
        />
      </Stack>
      <Button onClick={handleSearch} isLoading={isLoading}>
        Search
      </Button>
    </Stack>
  );
};

export default SearchBar;
