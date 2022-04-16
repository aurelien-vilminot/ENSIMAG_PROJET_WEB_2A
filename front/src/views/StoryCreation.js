import { Button, Checkbox, HStack, StatusBar } from 'native-base';
import React from 'react';
import { SafeAreaView, StyleSheet, TextInput } from 'react-native';
//import SegmentedControlTab from 'react-native-segmented-control-tab';
import { Formik } from 'formik';
import { useAppStateContext } from '../contexts/AppState';
import { storyService } from '../services/story';


export function StoryCreation({ navigation }) {
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const load = async () => {
    navigation.setOptions({
      title: 'Create a story',
    });
  };
  const { token } = useAppStateContext();
  React.useEffect(() => {
    load();
  }, []);

  const setStory = async ({ title, opened, pub, paragraphContent }) => {
    try {
      const newStory = await storyService.createStory(token, title, opened, pub);
      await storyService.updateParagraph(token, newStory.id, newStory.paragrapheInitial.id, paragraphContent);
    } catch (e) {
      console.log({ title, opened, pub, paragraphContent });
      console.log(e.response.data);
      throw e.response?.data?.message ?? e;
    }
  };

  // List style
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 0,
      margin: 10,
      paddingTop: 5,
    },
    input: {
      height: 40,
      width: 300,
      borderBottomWidth: 1,
      marginBottom: 10,
      padding: 10,
    },
    multiLinesInput: {
      width: 300,
      borderBottomWidth: 1,
      marginBottom: 10,
      padding: 10,
    },
    createButton: {
      width: 125,
      marginTop: 10,
    },
  });

  // Pour la modification de paragraphe
  // const handleIndexChange = i => {
  //   setSelectedIndex(i);
  // };

  // const renderTab = i => {
  //   return (
  //     <Formik
  //     initialValues={{
  //       username: '',
  //       password: '',
  //       passwordVerify: '',
  //     }}
  //     onSubmit={handleIndexChange}
  //   >
  //     {({ handleChange, handleBlur, handleSubmit, values, touched, errors }) => (
  //     <SafeAreaView style={styles.container}>
  //       <Text> Choice {i}</Text>
  //       <TextInput style={styles.input} placeholder={`Choice ${i}`} maxLength={255} />
  //     </SafeAreaView>
  //     )}
  //   </Formik>
  //   );
  // };

  return (
    <Formik
      initialValues={{
        title:'',
        opened:false,
        pub:false,
        paragraph:'',
      }}
      onSubmit={setStory}
    >
      {({ handleChange, handleBlur, handleSubmit, values, touched, errors }) => (
        <SafeAreaView style={styles.container}>
          <TextInput
            style={styles.input}
            placeholder="Story title"
            maxLength={255}
            onChangeText={handleChange('title')}
            onBlur={handleBlur('title')}
            value={values.title} />
          <TextInput
            style={styles.multiLinesInput}
            placeholder="Content of the first paragraph"
            maxLength={255}
            multiline
            numberOfLines={5}
            onChangeText={handleChange('paragraph')}
            onBlur={handleBlur('paragraph')}
            value={values.paragraph}
          />
    {/* Pour la modification de paragraphe
          <SegmentedControlTab
            values={['First', 'Second', 'Third']}
            selectedIndex={selectedIndex}
            onTabPress={handleIndexChange}
          />
          {renderTab(selectedIndex)} */}

          <HStack space={6}>
            <Checkbox shadow={2}
              value={values.pub}
              onChange={(e)=>{handleChange('pub')({target: {value: e}});}}
              onBlur={handleBlur('pub')}
              accessibilityLabel="This is a dummy checkbox">
              Make story public
            </Checkbox>
          </HStack>
          <Button colorScheme="primary" style={styles.createButton} onPress={handleSubmit}>
            Create story : {values.title}
          </Button>
        </SafeAreaView>

      )}
      </Formik>
  );
}