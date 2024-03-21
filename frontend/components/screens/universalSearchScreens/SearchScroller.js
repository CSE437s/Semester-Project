import React from "react";
import {
  View,
  ScrollView,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import ExerciseScreen from "../contentViewScreens/ExerciseScreen";

const SearchScroller = ({ category, data, handleItemPress }) => {
  const image = require("/Users/jameswu/git/cse437s/semester-project-group-3/frontend/assets/Man-Doing-Air-Squats-A-Bodyweight-Exercise-for-Legs.png");

  // const navigation = useNavigation();

  // const handlePress = (id) => {
  //   switch (category) {
  //     case "exercises":
  //       navigation.navigate("ExerciseScreen", { exercise_id: id });
  //       break;

  //     default:
  //       break;
  //   }
  // };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>{category}</Text>
      </View>
      {data.length > 0 ? (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.scroller}
        >
          {data.map((item) => (
            <View key={item["id"]} style={styles.imageContainer}>
              <TouchableOpacity
                onPress={() => {
                  handleItemPress(category, item["id"]);
                }}
              >
                <Image source={image} style={styles.image} />
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={styles.caption}
                >
                  {item.name ? item.name : item.username}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      ) : (
        <Text style={styles.noResults}>No results found</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 0,
    minHeight: 150,
    marginBottom: 10,
  },
  imageContainer: {
    marginRight: 20,
    width: 140,
  },
  image: {
    width: 140,
    height: 85,
    borderRadius: 10,
  },
  caption: {
    color: "#EEEEEE",
    marginTop: 5,
    textAlign: "center",
  },
  header: {
    color: "#525252",
    fontSize: 18,
  },
  headerContainer: {
    borderBottomWidth: 1,
    borderBottomColor: "#525252",
    padding: 3,
    alignSelf: "flex-start",
    marginBottom: 5,
  },
  noResults: {
    color: "#525252",
  },
  scroller: {
    marginTop: 5,
  },
});

export default SearchScroller;
