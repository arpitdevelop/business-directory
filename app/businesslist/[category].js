import { View, Text, FlatList, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../configs/FirebaseConfig'
import BusinessListCard from '../../components/BusinessList/BusinessListCard'
import { Colors } from '../../constants/Colors'

export default function BusinessListByCategory() {

  const navigation = useNavigation()
  const {category} = useLocalSearchParams()

  const [businessList, setBusinessList] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(()=>{
    navigation.setOptions({
      headerShown: true,
      headerTitle:category,
    })
    getBusinessList()
  }, [])


// Used to get business category

  const getBusinessList = async() => {
    setBusinessList([])
    setLoading(true)
    const q = query(collection(db, 'businessList'), where("category",'==',category))
    const querySnapshot =await getDocs(q)

    querySnapshot.forEach((doc)=>{
      console.log(doc.data())
      setBusinessList((prev)=>[...prev, doc.data()])
    })
    setLoading(false)
  }
  return (
    <View>
      {businessList?.length>0 && loading==false ? 
      <FlatList
      data={businessList}
      onRefresh={getBusinessList}
      refreshing={loading}
      renderItem={({item, index})=>(
        <BusinessListCard
        business={item}
        key={index}
        />
      )}
      /> :
      loading?<ActivityIndicator
      size={'large'}
      color={Colors.PRIMARY}
      style={{
        marginTop: '70%'
      }}
      /> :
      <Text style = {{
        fontSize:25,
        fontFamily:'primaryFont-bold',
        color:Colors.GRAY,
        textAlign: 'center',
        marginTop:'40%'
        }}>No Businesses Found!</Text>}
    </View>
  )
}