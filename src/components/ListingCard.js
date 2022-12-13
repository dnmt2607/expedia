import { Box, useColorModeValue, Stack } from "@chakra-ui/react";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import { Image } from "@chakra-ui/react";

const Rating = ({ rating, numReviews }) => {
  return (
    <Stack direction="row" align="center">
      {Array(5)
        .fill("")
        .map((_, i) => {
          const roundedRating = Math.round(rating * 2) / 2;
          if (roundedRating - i >= 1) {
            return (
              <BsStarFill
                key={i}
                style={{ marginLeft: "1" }}
                color={i < rating ? "teal.500" : "gray.300"}
              />
            );
          }
          if (roundedRating - i === 0.5) {
            return <BsStarHalf key={i} style={{ marginLeft: "1" }} />;
          }
          return <BsStar key={i} style={{ marginLeft: "1" }} />;
        })}
      <Box as="span" ml="2" color="gray.600" fontSize="sm">
        {numReviews} review{numReviews > 1 && "s"}
      </Box>
    </Stack>
  );
};

const ListingCard = ({ property, availPropertyInfo, occupancy }) => {
  const boxAColor = useColorModeValue("white", "gray.800");
  const boxBColor = useColorModeValue("gray.800", "white");

  console.log(property);
  return availPropertyInfo ? (
    <Stack align="center" justify="center" key={property.name}>
      <Box
        w="full"
        alignItems="center"
        justifyContent="center"
        bg={boxAColor}
        maxW="sm"
        borderWidth="1px"
        rounded="lg"
        shadow="lg"
        position="relative"
      >
        <Image
          objectFit="cover"
          maxW={{ base: "100%", sm: "406px" }}
          src={property.images[0].links["1000px"].href}
        />
        <Box p="6" justifyContent="space-between" alignContent="center">
          <Box fontSize="2xl" fontWeight="semibold" as="h4" lineHeight="tight">
            {property.name}
          </Box>

          <Rating
            rating={property.ratings.property.rating} //content property object
            numReviews={property.ratings.guest.count} //content property object
          />
          <Box fontSize="2xl" color={boxBColor}>
            <Box as="span" color={"gray.600"} fontSize="lg">
              $
            </Box>
            {
              availPropertyInfo.rooms[0].rates[0].occupancy_pricing[occupancy] //shopping property object
                .nightly[0][0].value
            }
          </Box>
        </Box>
      </Box>
    </Stack>
  ) : null;
};

export default ListingCard;
