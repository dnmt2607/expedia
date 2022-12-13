import { Button, Input, Stack, Checkbox, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import _ from "lodash";
import { BsStar } from "react-icons/bs";

const LANGUAGE = "en-US";

/**
 * Search Bar Layout.
 */
const FilterBar = ({
  searchProperties,
  searchPropertiesInfo,
  setFilterList,
  oneStar,
  twoStar,
  threeStar,
  fourStar,
  fiveStar,
  setOneStar,
  setTwoStar,
  setThreeStar,
  setFourStar,
  setFiveStar,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleFilter = async () => {
    setIsLoading(true);
    try {
      console.log(searchProperties);
      let temp = searchProperties.filter((property) => {
        let property_id = property.property_id;

        let propertyInfo = searchPropertiesInfo[property_id];
        /*  console.log(propertyInfo.ratings.property.rating);*/
        return (
          (propertyInfo.ratings.property.rating <= 1.9 && oneStar) ||
          (propertyInfo.ratings.property.rating >= 2 &&
            propertyInfo.ratings.property.rating <= 2.9 &&
            twoStar) ||
          (propertyInfo.ratings.property.rating >= 3 &&
            propertyInfo.ratings.property.rating <= 3.9 &&
            threeStar) ||
          (propertyInfo.ratings.property.rating >= 4 &&
            propertyInfo.ratings.property.rating <= 4.9 &&
            fourStar) ||
          (propertyInfo.ratings.property.rating === 5 && fiveStar)
        );
      });

      setFilterList(temp.map((obj) => obj.property_id));
    } catch (err) {
      console.log(err);
    }

    setIsLoading(false);
  };

  return (
    <Stack>
      <Stack spacing={2}>
        <Text>Star Rating</Text>
        <Stack direction="row">
          <Checkbox onChange={(e) => setOneStar(e.target.checked)} />
          <BsStar />
        </Stack>

        <Stack direction="row">
          <Checkbox onChange={(e) => setTwoStar(e.target.checked)} />
          <BsStar />
          <BsStar />
        </Stack>

        <Stack direction="row">
          <Checkbox onChange={(e) => setThreeStar(e.target.checked)} />
          <BsStar />
          <BsStar />
          <BsStar />
        </Stack>

        <Stack direction="row">
          <Checkbox onChange={(e) => setFourStar(e.target.checked)} />
          <BsStar />
          <BsStar />
          <BsStar />
          <BsStar />
        </Stack>

        <Stack direction="row">
          <Checkbox onChange={(e) => setFiveStar(e.target.checked)} />
          <BsStar />
          <BsStar />
          <BsStar />
          <BsStar />
          <BsStar />
        </Stack>
      </Stack>
      <Button onClick={handleFilter} isLoading={isLoading}>
        Filter
      </Button>
    </Stack>
  );
};

export default FilterBar;
