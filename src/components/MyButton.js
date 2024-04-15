import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

const Task = ({task,cmp,del}) => {
    const {id, text, completed} = task
    return (
      <view style = {{flexDirection: 'row', alignItems: 'center',
        justifyContent: 'space-around'}}>
      <Text>({id}) {text} </Text>
      {!completed && <Button title= 'Complete' onPress= {() =>cmp(id)}/>}
      <Button title = 'delete' onPress={() => del(id)}/>    
      </view>
    )


    const deleteTask = (id) => {
        setTasks(ts => ts.filter(t => t.id === id))
      }
      
      const completeTask = (id) => {
        setTasks(ts=>{
          const nts = ts.map(t=>{
            const nt = {...t}
            if(t.id === id)
              nt.completed = true
            return nts
          })
          return nts
        })
      }
  }


  const addText = () => {
    if(text ==='') return 
    const maxid = tasks.reduce((a,t) =>a<t.id?t.id:a,0)
    comsole.log("maxid: ",maxid)
    setTasks(tasks => [...tasks,{id:maxid+1, text, completed:false}])
    setTasks('')
    console.log(tasks)
  }

  <View>
  <TextInput placeholder= "Add a task"
  style={styles.input}
  value={text}
  onChangeText={setText}
  onSubmitEditing={addText} />
</View>



//const Task = ({task,cmp,del}) => {
    const {id, text, completed} = task
    return (
      <view style = {{flexDirection: 'row', alignItems: 'center',
        justifyContent: 'space-around'}}>
      <Text>({id}) {text} </Text>
      {!completed && <Button title= 'Complete' onPress= {() =>cmp(id)}/>}
      <Button title = 'delete' onPress={() => del(id)}/>    
      </view>
    )
//  }


const deleteTask = (id) => {
    setTasks(ts => ts.filter(t => t.id === id))
  }

  const completeTask = (id) => {
    setTasks(ts=>{
      const nts = ts.map(t=>{
        const nt = {...t}
        if(t.id === id)
          nt.completed = true
        return nts
      })
      return nts
    })
  }