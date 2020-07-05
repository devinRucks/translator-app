import * as React from 'react';
// import { useEffect, useContext } from 'react';
import { StyleSheet } from 'react-native';
import { View } from '../components/Themed';
import SelectImage from '../components/SelectImage';
import SelectLanguages from '../components/SelectLanguages';
import Translation from '../components/Translation';

const TabOneScreen = () => {


	return (
		<View style={styles.container}>
			<SelectLanguages />
			<SelectImage />
			<Translation />
		</View>
	);
}


const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'space-evenly',
		borderColor: 'red',
		borderWidth: 5
	},
});

export default TabOneScreen;
