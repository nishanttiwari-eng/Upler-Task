import {useState} from 'react';
import moment from 'moment';
import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import RBSheet from 'react-native-raw-bottom-sheet';
import Colors from './Colors';
import {dynamicSize, getFontSize} from './DynamicSize';
export const SCREEN_WIDTH = Dimensions.get('window').width;
export const SCREEN_HEIGHT = Dimensions.get('window').height;

export const PriceSheet = props => {
  const {reference, sortOptions, onApply} = props;
  console.log('sortOptions----price---', sortOptions);
  const [selectedSort, setSelectedSort] = useState('');
  const renderSortOptions = (item, index) => {
    const isSelected = item.value == selectedSort;
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          setSelectedSort(item.value);
        }}
        style={styles.optionView}>
        <Text
          style={[
            styles.defaultText,
            {
              color: isSelected ? Colors.darkOrange : Colors.darkGray,
              fontWeight: isSelected ? 'bold' : '500',
            },
          ]}>
          {item.value}
        </Text>
        {item.value == selectedSort ? (
          <Image
            resizeMode={'contain'}
            style={{height: 15, width: 15}}
            source={{
              uri: 'https://w7.pngwing.com/pngs/752/449/png-transparent-at-sign-computer-icons-radio-button-miscellaneous-monochrome-black-thumbnail.png',
            }}
          />
        ) : null}
      </TouchableOpacity>
    );
  };

  return (
    <RBSheet
      ref={reference}
      height={SCREEN_HEIGHT - 50}
      animationType={'slide'}
      closeOnPressMask={true}
      keyboardAvoidingViewEnabled={true}
      customStyles={{
        container: {
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          backgroundColor: Colors.white,
        },
        wrapper: {
          backgroundColor: Colors.modalBackground,
          paddingBottom: 20,
        },
      }}>
      <View style={[styles.chooseContainerSort, {height: 60}]}>
        <Text style={styles.chooseOptionsSort}>{'Choose One'}</Text>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            reference.current.close();
          }}>
          <Image
            resizeMode="contain"
            style={styles.iconStyle}
            source={{
              uri: 'https://png.pngtree.com/png-vector/20190429/ourmid/pngtree-vector-cross-icon-png-image_998226.jpg',
            }}
          />
        </TouchableOpacity>
      </View>

      <FlatList
        data={sortOptions}
        renderItem={({item, index}) => renderSortOptions(item, index)}
      />
      {selectedSort !== '' && (
        <CustomButton
          title={'Apply'}
          containerStyle={{width: '50%'}}
          onPressBtn={() => {
            reference.current.close();
            onApply(selectedSort);
          }}
        />
      )}
    </RBSheet>
  );
};

export const AirlineSheet = props => {
  const {reference, sortOptions, onApply} = props;
  console.log('sortOptions----airline---', sortOptions);
  const [selectedSort, setSelectedSort] = useState('');
  const renderSortOptions = (item, index) => {
    const isSelected = item.value == selectedSort;
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          setSelectedSort(item.value);
        }}
        style={{
          height: 30,
          borderWidth: 2,
          borderColor: isSelected ? Colors.darkOrange : Colors.darkGray,
          backgroundColor: Colors.dimGray,
          borderRadius: 3,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 30,
          margin: 5,
        }}>
        <Text
          style={[
            styles.defaultText,
            {
              color: isSelected ? Colors.darkOrange : Colors.darkGray,
              fontWeight: isSelected ? 'bold' : '500',
            },
          ]}>
          {item.value}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <RBSheet
      ref={reference}
      height={SCREEN_HEIGHT / 2}
      animationType={'slide'}
      closeOnPressMask={true}
      keyboardAvoidingViewEnabled={true}
      customStyles={{
        container: {
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          backgroundColor: Colors.white,
        },
        wrapper: {
          backgroundColor: Colors.modalBackground,
          paddingBottom: 20,
        },
      }}>
      <View style={[styles.chooseContainerSort, {height: 60}]}>
        <Text style={styles.chooseOptionsSort}>{'Choose One'}</Text>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            reference.current.close();
          }}>
          <Image
            resizeMode="contain"
            style={styles.iconStyle}
            source={{
              uri: 'https://png.pngtree.com/png-vector/20190429/ourmid/pngtree-vector-cross-icon-png-image_998226.jpg',
            }}
          />
        </TouchableOpacity>
      </View>

      <FlatList
        data={sortOptions}
        numColumns={2}
        renderItem={({item, index}) => renderSortOptions(item, index)}
        style={{marginTop: 20, alignSelf: 'center'}}
      />
      {selectedSort !== '' && (
        <CustomButton
          title={'Apply'}
          containerStyle={{width: '50%'}}
          onPressBtn={() => {
            reference.current.close();
            onApply(selectedSort);
          }}
        />
      )}
    </RBSheet>
  );
};

export const FlightView = ({item}) => {
  return (
    <TouchableOpacity
      onPress={() => Alert.alert('Flight Info', JSON.stringify(item))}
      activeOpacity={1}
      style={{
        alignSelf: 'center',
        width: '95%',
        marginVertical: 10,
        marginHorizontal: 10,
        borderRadius: 10,
        padding: 20,
        backgroundColor: Colors.white,
        shadowColor: Colors.black,
        shadowOffset: {width: 2, height: 6},
        shadowRadius: 6,
        shadowOpacity: 0.2,
        elevation: 15,
      }}>
      <>
        <Text
          style={{color: Colors.darkGray, textAlign: 'center', fontSize: 15}}>
          {item.duration}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '75%',
          }}>
          <View
            style={{
              width: '35%',
              justifyContent: 'center',
            }}>
            <Text style={{color: Colors.darkGray, fontSize: 13}}>
              {item.origin.toUpperCase()}
            </Text>
            <Text style={{fontWeight: '900', color: Colors.linkBlue}}>
              {moment(item.arrivalTime).format('HH:MM A')}
            </Text>
          </View>
          <Image
            style={{width: '65%', height: '100%'}}
            source={{
              uri: 'https://rexyedventures.com/wp-content/uploads/2013/03/plane.jpg',
            }}
          />
          <View
            style={{
              alignItems: 'flex-end',
              justifyContent: 'center',
              width: '35%',
            }}>
            <Text style={{color: Colors.darkGray, fontSize: 13}}>
              {item.destination.toUpperCase()}
            </Text>
            <Text style={{fontWeight: '900', color: Colors.linkBlue}}>
              {moment(item.departureTime).format('HH:MM A')}
            </Text>
          </View>
        </View>
        <Text
          style={{color: Colors.darkGray, textAlign: 'center', fontSize: 15}}>
          {'Non-Stop'}
        </Text>
      </>
      <View
        style={{
          alignSelf: 'center',
          borderTopColor: Colors.dimGray,
          width: '112%',
          paddingHorizontal: 20,
          borderTopWidth: 1,
          marginVertical: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text style={{marginTop: 15, color: Colors.darkGray}}>
          {item.flightNumber}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            style={{height: 20, marginTop: 15, marginRight: 5, width: 20}}
            source={{
              uri: 'https://png.pngtree.com/png-clipart/20190516/original/pngtree-question-mark-vector-icon-png-image_4236972.jpg',
            }}
          />
          <Text
            style={{
              color: Colors.darkGray,
              marginTop: 10,
              textAlign: 'center',
            }}>
            By : {item.airline}
          </Text>
        </View>
        <Text style={{marginTop: 15, color: Colors.black, fontWeight: '900'}}>
          ₹ {item.price}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export const CustomButton = props => {
  const {title, titleTextStyle, onPressBtn, containerStyle} = props;
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[styles.buttonView, containerStyle]}
      onPress={onPressBtn}>
      <Text style={[styles.customBtnTextStyle, titleTextStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

export const DropDown = props => {
  const {containerViewStyle} = props;
  return (
    <View
      style={[
        {
          // width:"80%",
          // marginHorizontal:30,
          alignSelf: 'center',
        },
        containerViewStyle,
      ]}>
      <RNPickerSelect
        {...props}
        //  placeholder = {{}}
        useNativeAndroidPickerStyle={false}
        fixAndroidTouchableBug={true}
        onDonePress={() => console.log('onDonePress')}
        onUpArrow={() => console.log('onUpArrow')}
        onDownArrow={() => console.log('onDownArrow')}
        style={{
          inputAndroid: styles.rnPickerSelectStyle,
          inputIOS: styles.rnPickerSelectStyle,
        }}
        textInputProps={styles.pickerContainer}
        Icon={() => (
          <Image
            resizeMode="contain"
            style={styles.rowIconStyle}
            source={{
              uri: 'https://i0.wp.com/meritocracy.is/blog/wp-content/uploads/2019/01/grey-down-arrow-icon-png-1.png?fit=385%2C233&ssl=1',
            }}
          />
        )}
      />
    </View>
  );
};

export const EmptyMessage = props => {
  const {message, styles} = props;
  return (
    <View
      style={[
        {
          height: SCREEN_HEIGHT - 200,
          justifyContent: 'center',
          alignItems: 'center',
        },
        styles,
      ]}>
      <Text
        style={{
          fontSize: 23,
          alignSelf: 'center',
          color: Colors.darkGray,
        }}>
        {message}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  inputStyle: {
    borderWidth: 1,
    borderColor: Colors.black,
    height: dynamicSize(35),
    color: Colors.black,
    width: '50%',
  },

  buttonView: {
    height: dynamicSize(35),
    paddingHorizontal: 10,
    marginVertical: 10,
    alignSelf: 'center',
    borderRadius: 5,
    backgroundColor: Colors.darkGray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  customBtnTextStyle: {
    fontSize: getFontSize(13),
    color: Colors.white,
    fontWeight: 'bold',
  },
  rnPickerSelectStyle: {
    width: '100%',
    paddingLeft: 11,

    fontSize: 12,
    color: Colors.darkblack,
  },
  pickerContainer: {
    marginVertical: 10,
    fontSize: 17,
    color: Colors.darkGray,

    paddingLeft: 15,
    width: SCREEN_WIDTH - 40,
    borderWidth: 1,
    borderColor: Colors.dimGray,
    height: 60,
    borderRadius: 8,
    backgroundColor: Colors.lightGray,
  },
  rowIconStyle: {
    height: 20,
    width: 20,
    top: 30,
    end: 30,
  },

  // ========Sorting bottom sheet============================
  optionView: {
    height: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginVertical: 5,
  },
  defaultText: {
    color: Colors.white,
    fontSize: 15,
    marginLeft: 10,
  },
  iconStyle: {
    height: 25,
    width: 25,
  },
  chooseContainerSort: {
    borderBottomWidth: 0.5,
    borderColor: Colors.lineGray,
    flexDirection: 'row',
    alignItems: 'center',
    height: 70,
    paddingHorizontal: '4%',
    width: '100%',
    alignSelf: 'center',
    justifyContent: 'space-between',
  },
  chooseOptionsSort: {
    color: Colors.darkGray,
    fontSize: 20,
    paddingLeft: 5,
  },
  optionViewSort: {
    height: 30,
    flexDirection: 'row',
    marginVertical: 8,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  optionViewColorSort: {
    height: 30,

    flexDirection: 'row',
    marginVertical: 8,
    alignItems: 'center',

    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },

  defaultTextSort: {
    fontSize: 14,
  },
});
