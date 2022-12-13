import {
  ChakraProvider,
  Container,
  Heading,
  Stack,
  Text,
  Flex,
} from "@chakra-ui/react";
import { useState } from "react";
import FilterBar from "./components/Filter";
import ListingCard from "./components/ListingCard";
import SearchBar from "./components/Search";

function App() {
  const [destination, setDestination] = useState(null);

  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [propertyIds, setPropertyIds] = useState([]);
  const [occupancy, setOccupancy] = useState(null);
  const [searchedProperties, setSearchProperties] = useState([]); // based on availability search
  const [searchedPropertiesInfo, setSearchPropertiesInfo] = useState([]); //property content
  const [filterList, setFilterList] = useState([]);

  const [oneStar, setOneStar] = useState(false);
  const [twoStar, setTwoStar] = useState(false);
  const [threeStar, setThreeStar] = useState(false);
  const [fourStar, setFourStar] = useState(false);
  const [fiveStar, setFiveStar] = useState(false);

  return (
    <ChakraProvider>
      <Stack maxW="1475px" p={4} spacing={4}>
        <Stack align="center" justify="center">
          <Heading>Expedia API Demo</Heading>
        </Stack>
        <SearchBar
          destination={destination}
          checkIn={checkIn}
          checkOut={checkOut}
          propertyIds={propertyIds}
          occupancy={occupancy}
          setDestination={setDestination}
          setCheckIn={setCheckIn}
          setCheckOut={setCheckOut}
          setPropertyIds={setPropertyIds}
          setOccupancy={setOccupancy}
          setSearchProperties={setSearchProperties}
          setSearchPropertiesInfo={setSearchPropertiesInfo}
        />
        <Flex>
          <Stack flex={2}>
            <Heading as={"h6"} size="sm">
              Filter By
            </Heading>
            <FilterBar
              searchProperties={searchedProperties}
              searchPropertiesInfo={searchedPropertiesInfo}
              setSearchProperties={setSearchProperties}
              setSearchPropertiesInfo={setSearchPropertiesInfo}
              filterList={filterList}
              setFilterList={setFilterList}
              oneStar={oneStar}
              twoStar={twoStar}
              threeStar={threeStar}
              fourStar={fourStar}
              fiveStar={fiveStar}
              setOneStar={setOneStar}
              setTwoStar={setTwoStar}
              setThreeStar={setThreeStar}
              setFourStar={setFourStar}
              setFiveStar={setFiveStar}
            />
          </Stack>
          <Stack spacing={10} flex={10}>
            <Text color="gray.500" alignSelf={"center"}>
              {filterList.length === 0 &&
              !(oneStar || twoStar || threeStar || fourStar || fiveStar)
                ? searchedProperties.length
                : filterList.length}{" "}
              Results
            </Text>
            {filterList.length === 0 &&
            !(oneStar || twoStar || threeStar || fourStar || fiveStar)
              ? Object.keys(searchedPropertiesInfo).map((propertyId) => (
                  <ListingCard
                    property={searchedPropertiesInfo[propertyId]}
                    occupancy={occupancy}
                    availPropertyInfo={
                      searchedProperties.filter((property) => {
                        return (
                          parseInt(property.property_id) ===
                          parseInt(propertyId)
                        );
                      })[0]
                    }
                  />
                ))
              : filterList.map((propertyId) => (
                  <ListingCard
                    property={searchedPropertiesInfo[propertyId]}
                    occupancy={occupancy}
                    availPropertyInfo={
                      searchedProperties.filter((property) => {
                        return (
                          parseInt(property.property_id) ===
                          parseInt(propertyId)
                        );
                      })[0]
                    }
                  />
                ))}
          </Stack>
        </Flex>
      </Stack>
    </ChakraProvider>
  );
}

export default App;
