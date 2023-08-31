import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Platform,
  SafeAreaView,
  SectionList,
  PermissionsAndroid,
  FlatList,
  Image
} from 'react-native';
import Header from "../../../components/Common/Header";
import { useNavigation } from "@react-navigation/native";
import { Feather, MaterialIcons  } from '@expo/vector-icons';
import green_tick from '../../../../assets/green_tick.png';
import Modal from 'react-native-modal';
import backgroundImage from '../../../../assets/tmp-plant.png';
import SegmentedControl from '@react-native-segmented-control/segmented-control';





const styles2 = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDFAFA',
    height: 100,
  },
  sectionHeader: {
    fontWeight: '800',
    fontSize: 18,
    color: '#f4f4f4',
    marginTop: 20,
    marginBottom: 5,
  },
  item: {
    margin: 10,
  },
  itemPhoto: {
    width: 200,
    height: 200,
  },
  itemText: {
    color: 'rgba(255, 255, 255, 0.5)',
    marginTop: 5,
  },
});


export default function VarietySelection() {

  const navigation = useNavigation();
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isError, setError] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedCropIndex, setSelectedCropIndex] = useState(0); 
  const [selectedHarvestIndex, setselectedHarvestIndex] = useState(0);
  const [selectedTasteIndex, setselectedTasteIndex] = useState(0);
  const [selectedSizeIndex, setselectedSizeIndex] = useState(0);
  const [cropLocation, setCropLocation] = useState('');
  const [selectedFeatures, setSelectedFeatures] = useState([]);

  useEffect(() => {
    setModalVisible(true)
  }, []);

  

  const handleRetakePicture = async () => {
    navigation.navigate("BuddingScanScreen");
  }

  const isFeatureSelected = (feature) => selectedFeatures.includes(feature);


  

  const toggleFeatureSelection = (feature) => {
    if (isFeatureSelected(feature)) {
      setSelectedFeatures(selectedFeatures.filter(item => item !== feature));
    } else {
      setSelectedFeatures([...selectedFeatures, feature]);
    }
  }

  return (
    
    <View style={{ backgroundColor: '#fdfafa', height: '100%' }}>
        <Header />

      <Text style={{ fontSize: 20, fontFamily: 'Roboto', paddingTop: 2, textAlign: 'left', paddingRight: 13, marginLeft: 20, fontStyle: 'italic' }}>Time your bud </Text>
      <Text style={{ fontSize: 20, fontFamily: 'Roboto', paddingTop: 2, textAlign: 'left', paddingRight: 13, marginLeft: 20, fontStyle: 'italic' }}>perfectly</Text>

      <Text style={{ fontSize: 14, fontFamily: 'Inter', color: '#666666', paddingLeft: 20, marginTop: 10 }}>Please provide the characteristics you desire in your mango plant, and we will analyze your requirements to recommend the most suitable variety.</Text>
  
      <Text style={{ fontSize: 16, fontFamily: 'Roboto', fontWeight: 'bold', color: '#000000', paddingLeft: 20, marginTop: 10, marginBottom: 10 }}>Purpose of crop :</Text>

      <SegmentedControl
        values={['Personal', 'Commercial', 'Export']}
        selectedIndex={selectedCropIndex}
        onChange={(event) => {
          setSelectedCropIndex(event.nativeEvent.selectedSegmentIndex);
        }}
        fontStyle={{ fontSize: 16 }}
      />

<Text style={{ fontSize: 16, fontFamily: 'Roboto', fontWeight: 'bold', color: '#000000', paddingLeft: 20, marginTop: 10, marginBottom: 10 }}>Crop location :</Text>

<View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 20 }}>
  <TextInput
    style={{ width: '80%', height: 50, fontSize:16, borderWidth: 1, borderColor: '#F8F8F8', borderRadius: 8, padding: 10, backgroundColor: '#eeeeee', color: '#000000' }}
    placeholder="Enter crop location"
    value={cropLocation}
    onChangeText={text => setCropLocation(text)}
  />
  <TouchableOpacity onPress={() => { /* Your button onPress logic */ }} style={{ marginLeft: 10 }}>
    <MaterialIcons name="place" size={30} color="#FDC704" style={{ marginLeft: 10 }}/>
  </TouchableOpacity>
</View>

<Text style={{ fontSize: 16, fontFamily: 'Roboto', fontWeight: 'bold', color: '#000000', paddingLeft: 20, marginTop: 10, marginBottom: 10 }}>Required features :</Text>

{/* Checklist */}
<View style={{ marginLeft: 20 }}>
        <TouchableOpacity onPress={() => toggleFeatureSelection('Harvest')} style={{ flexDirection: 'row', alignItems: 'center' }}>
          <MaterialIcons style={{marginLeft:10}} name={isFeatureSelected('Harvest') ? 'check-box' : 'check-box-outline-blank'} size={24} color={isFeatureSelected('Feature 1') ? '#E97918' : '#6C757D'} />
          <Text style={{ fontSize: 16, color: isFeatureSelected('Harvest') ? '#E97918' : '#6C757D', marginLeft: 10, padding:10 }}>Harvest</Text>
        </TouchableOpacity>

        {isFeatureSelected('Harvest') && (
          <SegmentedControl
            values={['High', 'Medium', 'Low']}
            selectedIndex={selectedHarvestIndex}
            onChange={(event) => {
              setselectedHarvestIndex(event.nativeEvent.selectedSegmentIndex);
            }}
            fontStyle={{ fontSize: 16 }}
          />
        )}

        <TouchableOpacity onPress={() => toggleFeatureSelection('Taste')} style={{ flexDirection: 'row', alignItems: 'center' }}>
          <MaterialIcons style={{marginLeft:10}}  name={isFeatureSelected('Taste') ? 'check-box' : 'check-box-outline-blank'} size={24} color={isFeatureSelected('Feature 2') ? '#E97918' : '#6C757D'} />
          <Text style={{ fontSize: 16, color: isFeatureSelected('Taste') ? '#E97918' : '#6C757D', marginLeft: 10, padding:10 }}>Unique taste</Text>
        </TouchableOpacity>

        {isFeatureSelected('Taste') && (
          <SegmentedControl
            values={['Good', 'Average']}
            selectedIndex={selectedTasteIndex}
            onChange={(event) => {
              setselectedTasteIndex(event.nativeEvent.selectedSegmentIndex);
            }}
            fontStyle={{ fontSize: 16 }}
          />
        )}

        <TouchableOpacity onPress={() => toggleFeatureSelection('Size')} style={{ flexDirection: 'row', alignItems: 'center' }}>
          <MaterialIcons style={{marginLeft:10}} name={isFeatureSelected('Size') ? 'check-box' : 'check-box-outline-blank'} size={24} color={isFeatureSelected('Feature 1') ? '#E97918' : '#6C757D'} />
          <Text style={{ fontSize: 16, color: isFeatureSelected('Size') ? '#E97918' : '#6C757D', marginLeft: 10, padding:10 }}>Size of fruit</Text>
        </TouchableOpacity>

        {isFeatureSelected('Size') && (
          <SegmentedControl
            values={['Big', 'Medium', 'Small']}
            selectedIndex={selectedSizeIndex}
            onChange={(event) => {
              setselectedSizeIndex(event.nativeEvent.selectedSegmentIndex);
            }}
            fontStyle={{ fontSize: 16 }}
          />
        )}

        <TouchableOpacity onPress={() => toggleFeatureSelection('Resistance')} style={{ flexDirection: 'row', alignItems: 'center' }}>
          <MaterialIcons style={{marginLeft:10}}  name={isFeatureSelected('Resistance') ? 'check-box' : 'check-box-outline-blank'} size={24} color={isFeatureSelected('Feature 2') ? '#E97918' : '#6C757D'} />
          <Text style={{ fontSize: 16, color: isFeatureSelected('Resistance') ? '#E97918' : '#6C757D', marginLeft: 10, padding:10 }}>Disease resistance</Text>
        </TouchableOpacity>
</View>
    

      <TouchableOpacity style={styles.findSuitableVarierty} onPress={() => setModalVisible(false)} >
          <Text style={{ fontSize: 17, fontWeight: 'bold', padding: 5,  textAlign: 'center' }}> Find matching variety </Text>
      </TouchableOpacity>


      
    </View>
  )
}

const styles = StyleSheet.create({

  imageContainer: {
    marginBottom: 5,
    marginTop: 30,
    width: '95%',
    marginLeft: 10,
    padding: 10,
    backgroundColor: '#f3fdee',
    borderRadius: 20,
    shadowOffset: {
      width: 0.5,
      height: 1,
    },
    shadowOpacity: 0.4,
    shadowRadius: 1.21,
    elevation: 2
  },
  topic: {
    flexDirection: 'row',
    paddingTop: 20,
    backgroundColor: '#fdfafa',
  },
  error: {
    color: 'red',
    marginTop: 5,
    fontSize: 8
  },
  backButton: {
    width: 30,
    height: 35,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginTop: -10,
    marginLeft: 15,
    marginRight: 60
  },
  button: {
    backgroundColor: '#fdc50b',
    width: 220,
    height: 65,
    paddingBottom: 0,
    borderRadius: 25,
    marginTop: 20,
    alignSelf: 'center',
    marginBottom: 10,
  },
  btntext: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#144100',
    paddingTop: 10,
    marginTop: 10
  },
  infoModal: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    width: '100%',
    maxHeight: '90%',
    minHeight: '60%',
    marginBottom: 20,
    marginLeft: 0,
    borderRadius: 20,
    borderColor: '#899186',
    shadowOffset: {
      width: 0.8,
      height: 1,
    },
    shadowOpacity: 0.4,
    shadowRadius: 1.21,
    elevation: 2
  },
  okButton: {
    backgroundColor: '#fdc50b',
    padding: 10,
    width: 80,
    height: 50,
    textAlign: 'center',
    color: '#144100',
    borderRadius: 25,
    marginTop: 50,
    alignSelf: 'center',
    marginBottom: 20,
  },
  findVarierty: {
    backgroundColor: 'green',
    padding: 10,
    width: 280,
    height: 50,
    textAlign: 'center',
    color: '#FFFFFF',
    borderRadius: 15,
    marginTop: 10,
    alignSelf: 'center',
    marginBottom: 10,
  },
  findSuitableVarierty: {
    backgroundColor: '#FDC704',
    padding: 10,
    width: 280,
    height: 50,
    textAlign: 'center',
    color: '#000000',
    borderRadius: 15,
    marginTop: 20,
    alignSelf: 'center',
    marginBottom: 10,
  },
  retakePhoto: {
    backgroundColor: '#BBC6BC',
    padding: 10,
    width: 180,
    height: 50,
    textAlign: 'center',
    color: 'black',
    borderRadius: 15,
    marginTop: 0,
    alignSelf: 'center',
    marginBottom: 20,
  },
  sensorimage: {
    width: 100,
    height: 110,
    marginTop: -20,
    marginLeft: -5,
    marginRight: 0,
    marginBottom: 5,
  },
  monitorimage: {
    width: 95,
    height: 120,
    marginTop: -20,
    marginLeft: 25,
    marginRight: 0,
    marginBottom: 5,
  },
  reportimage: {
    width: 100,
    height: 110,
    marginTop: -20,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 5,
  },
  vectorimage: {
    width: 30,
    height: 30,
    marginTop: -10,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 15,
  },
  modalContent: {
    backgroundColor: '#ffffff',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    borderColor: '#899186',
    shadowOffset: {
      width: 0.8,
      height: 1,
    },
    shadowOpacity: 0.4,
    shadowRadius: 1.21,
    elevation: 2
  },
  modalText: {
    fontSize: 14,
    fontStyle: 'italic',
    padding: 5,
    color: '#000000',
    textAlign: 'center',
    marginTop:25,
    marginBottom:-20
  },

});