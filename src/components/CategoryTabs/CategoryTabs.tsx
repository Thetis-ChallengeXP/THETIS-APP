import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

interface Category {
  id: string;
  name: string;
  isActive: boolean;
}

interface CategoryTabsProps {
  categories: Category[];
  onSelectCategory?: (id: string) => void;
}

const CategoryTabs: React.FC<CategoryTabsProps> = ({ categories, onSelectCategory }) => {
  const [activeCategories, setActiveCategories] = React.useState<Category[]>(categories);

  const handleCategoryPress = (id: string) => {
    const updatedCategories = activeCategories.map((category) => ({
      ...category,
      isActive: category.id === id,
    }));

    setActiveCategories(updatedCategories);

    if (onSelectCategory) {
      onSelectCategory(id);
    }
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {activeCategories.map((category) => (
        <TouchableOpacity
          key={category.id}
          style={[styles.tab, category.isActive ? styles.activeTab : null]}
          onPress={() => handleCategoryPress(category.id)}
        >
          <Text style={[styles.tabText, category.isActive ? styles.activeTabText : null]}>
            {category.name}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 10,
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: '#F5F5F5',
  },
  activeTab: {
    backgroundColor: '#E3F2FD',
  },
  tabText: {
    fontSize: 14,
    color: '#9E9E9E',
  },
  activeTabText: {
    color: '#1E88E5',
    fontWeight: '500',
  },
});

export default CategoryTabs;
