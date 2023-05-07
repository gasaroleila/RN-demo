import React from "react";
import {
  StyleSheet,
  View,
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  Image,
  Button
} from "react-native";
import { Icon } from "react-native-elements";
import Swipeable from 'react-native-gesture-handler/Swipeable';
// import { enText } from "../lang/en";

let row = [];
let prevOpenedRow;

export default class SwpipeToDeleteList extends React.Component {
    
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      dataSource: [],
    };
  }
  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    this.setState({ loading: true });

    fetch("https://jsonplaceholder.typicode.com/photos")
      .then((response) => response.json())
      .then((responseJson) => {
        responseJson = responseJson.map((item) => {
          item.isSelect = false;
          item.selectedClass = styles.list;

          return item;
        });

        this.setState({
          loading: false,
          dataSource: responseJson,
        });
      })
      .catch((error) => {
        this.setState({ loading: false });
      });
  };

  FlatListItemSeparator = () => <View style={styles.line} />;


    deleteItem = (data) => {
        this.state.dataSource = this.state.dataSource.filter(e => e.id !== data.item.id)
                
          this.setState({
            dataSource: this.state.dataSource,
          });

   }

    renderItem = ({ item, index}, onClick) => {
        const closeRow = (index) => {
            if (prevOpenedRow && prevOpenedRow !== row[index]) {
              prevOpenedRow.close();
            }
            prevOpenedRow = row[index];
          };
      
          const renderRightActions = (progress, dragX, onClick) => {
            return (
              <View
                style={{
                  margin: 0,
                  alignContent: 'center',
                  justifyContent: 'center',
                  width: 70,
                }}>
                <Button color="red" onPress={onClick} title="DELETE"></Button>
              </View>
            );
          }
       return (
            <Swipeable
                renderRightActions={(progress, dragX) =>
                    renderRightActions(progress, dragX, onClick)
                }
                onSwipeableOpen={() => closeRow(index)}
                ref={(ref) => (row[index] = ref)}
                rightOpenValue={-100}
            >
                <View
                    style={[styles.list, item.selectedClass]}
                >
                    <Image
                        source={{ uri: item.thumbnailUrl }}
                        style={{ width: 40, height: 40, margin: 6 }}
                    />
                    <Text style={styles.lightText}>
                        {" "}
                        {item.title.charAt(0).toUpperCase() +
                            item.title.slice(1)}{" "}
                    </Text>
                </View>
            </Swipeable>
        )
    };

  render() {
    const itemNumber = this.state.dataSource.filter(
      (item) => item.isSelect
    ).length;
    if (this.state.loading) {
      return (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="purple" />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        {/* <Text style={styles.title}>{enText.productsAvailable}</Text> */}
        <FlatList
          data={this.state.dataSource}
          ItemSeparatorComponent={this.FlatListItemSeparator}
          renderItem={(item) => this.renderItem(item, () => {
            this.deleteItem(item)
          })}
          keyExtractor={(item) => item.id.toString()}
          extraData={this.state}
        />

        <View style={styles.numberBox}>
          <Text style={styles.number}>{itemNumber}</Text>
        </View>

        <TouchableOpacity style={styles.icon}>
          <View>
            <Icon
              raised
              name="shopping-cart"
              type="font-awesome"
              color="#e3e3e3"
              size={30}
              onPress={() => this.goToStore()}
              containerStyle={{ backgroundColor: "#FA7B5F" }}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#192338",
    paddingVertical: 50,
    position: "relative",
  },
  title: {
    fontSize: 20,
    color: "#fff",
    textAlign: "center",
    marginBottom: 10,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  list: {
    paddingVertical: 5,
    margin: 3,
    flexDirection: "row",
    backgroundColor: "#192338",
    justifyContent: "flex-start",
    alignItems: "center",
    zIndex: -1,
  },
  lightText: {
    color: "#f7f7f7",
    width: 200,
    paddingLeft: 15,
    fontSize: 12,
  },
  line: {
    height: 0.5,
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.5)",
  },
  icon: {
    position: "absolute",
    bottom: 20,
    width: "100%",
    left: 290,
    zIndex: 1,
  },
  numberBox: {
    position: "absolute",
    bottom: 75,
    width: 30,
    height: 30,
    borderRadius: 15,
    left: 330,
    zIndex: 3,
    backgroundColor: "#e3e3e3",
    justifyContent: "center",
    alignItems: "center",
  },
  number: { fontSize: 14, color: "#000" },
  selected: { backgroundColor: "#FA7B5F" },
});
