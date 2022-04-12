import { useAppStateContext } from '../contexts/AppState';
import { Flex, View, Text, Icon, Box, Button, ScrollView, StatusBar } from 'native-base';
import React, { useState, useRef } from 'react';
import { paragraphService } from '../services/paragraph';
import { StyleSheet } from 'react-native';
import { ParagraphComponent } from '../components/paragraph';

export function Paragraph({ navigation, route }) {
  const { token } = useAppStateContext();
  const { story, paragraph, choiceRowArray } = route.params;

  const load = () => {
    navigation.setOptions({ title: story.titre });
  };

  const onPressChoice = async choiceId => {
    // TODO: gérer l'historique (avec le bouton retour également !)
    const util = await paragraphService.getParagraph(token, story.id, choiceId);
    navigation.push('Paragraph', {
      story: story,
      paragraph: util.paragraph,
      choiceRowArray: util.choiceRowArray,
    });
  };

  React.useEffect(() => {
    load();
  }, []);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 0,
    },
    baseText: {
      fontFamily: 'Roboto',
      fontSize: 18,
    },
    scrollView: {
      marginHorizontal: 20,
      marginTop: 20,
    },
  });

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <ParagraphComponent
          token={token}
          story={story}
          paragraph={paragraph}
          choiceRowArray={choiceRowArray}
          onPressChoice={onPressChoice}
        />
      </ScrollView>
    </View>
  );
}