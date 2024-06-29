import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'

import { Icon } from 'react-native-elements'
import { data } from '../../data/Data'

const HomeScreen = () => {

  const [modifiedData, setModifiedData] = useState([]);
  const likePhoto = (id, likeStatus) => {
    const likeStatusChanged = modifiedData.map((item) => {
      if (item.id === id) {
        item.likeStatus = !likeStatus;
      }
      return item;
    });
    setModifiedData(likeStatusChanged);
  }

  useEffect(() => {
    const newData = data.map((item) => {
      item.likeStatus = false;
      return item;
    });
    setModifiedData(newData);
  }, []);

  return (
    <View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.flatlistContainer}
        renderItem={({ item }) => {
          return (
            <View style={styles.mainContainer}>
              <View style={styles.topContainer}>
                <Image
                  style={styles.profilePicture}
                  source={{ uri: item.profilePicture }}
                />

                <View style={styles.normalMarginLeft}>
                  <Text style={styles.text}>
                    {item.username}
                  </Text>
                </View>
              </View>
              <Image
                style={styles.image}
                source={{ uri: item.imageLink }}
              />
              <View style={styles.captionContainer}>
                <Text style={styles.text}>
                  {item.username + " "}
                  <Text style={styles.caption}>
                    {item.caption}
                  </Text>
                </Text>
              </View>
              <View style={styles.bottomContainer}>
                <TouchableOpacity
                  style={styles.horizontalContainer}
                  onPress={() => likePhoto(item.id, item.likeStatus)}
                >
                  <Icon
                    name={item.likeStatus ? 'heart' : 'heart-o'}
                    type='font-awesome'
                    size={20}
                    color={item.likeStatus ? 'red' : null} />
                  <View style={styles.normalMarginLeft}>
                    {
                      item.likeStatus ?
                        <Text>Unlike</Text> : <Text>Like</Text>
                    }
                  </View>
                </TouchableOpacity>
                <View style={styles.horizontalContainer}>
                  <Icon name='comments-o' type='font-awesome' size={20}
                  />
                  <View style={styles.normalMarginLeft}>
                    <Text>Comment</Text>
                  </View>
                </View>
              </View>
            </View>
          )
        }}
      />
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  flatlistContainer: {
    padding: 8
  },
  mainContainer: {
    backgroundColor: 'white',
    margin: 8,
    borderRadius: 10
  },
  topContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 8
  },
  profilePicture: {
    width: 50,
    height: 50,
    borderRadius: 100
  },
  normalMarginLeft: {
    marginLeft: 8
  },
  image: {
    width: '100%',
    height: 300
  },
  captionContainer: {
    margin: 8,
    flex: 1
  },
  text: {
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'justify'
  },
  caption: {
    fontWeight: 'normal'
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    margin: 8,
    padding: 8
  },
  horizontalContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  }
});