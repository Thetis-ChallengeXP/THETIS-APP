import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

interface BookmarkItemProps {
  item: {
    id: string;
    title: string;
    company: string;
    symbol: string;
    change: string;
    time: string;
  };
  onPress?: () => void;
}

const BookmarkItem: React.FC<BookmarkItemProps> = ({ item, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.contentContainer}>
        <Text style={styles.title} numberOfLines={2}>
          {item.title}
        </Text>

        <View style={styles.detailsContainer}>
          <Text style={styles.company}>{item.company}</Text>
          <Text style={styles.symbol}>{item.symbol}</Text>
          <Text style={styles.time}>{item.time}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.arrowButton}>
        <Icon name="arrow-up-right" size={20} color="#1E88E5" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  contentContainer: {
    flex: 1,
    marginRight: 10,
  },
  title: {
    fontSize: 14,
    color: '#212121',
    marginBottom: 4,
    lineHeight: 20,
  },
  detailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  company: {
    fontSize: 14,
    fontWeight: '500',
    color: '#212121',
  },
  symbol: {
    fontSize: 12,
    color: '#9E9E9E',
    marginLeft: 8,
  },
  time: {
    fontSize: 12,
    color: '#9E9E9E',
    marginLeft: 8,
  },
  arrowButton: {
    padding: 8,
  },
});

export default BookmarkItem;
