import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

const InputTag = (props) => {
  const [tagItem, setTagItem] = useState(null)
  const [tagList, setTagList] = useState([])

  useEffect(() =>{
    if(props.setTag != null && props.setTag.length != 0){
      console.log(props.setTag);
      var setTag = props.setTag.split(",")
      let updatedTagList = [...tagList]
      setTag.forEach(element => {
        updatedTagList.push(element)
      })
      setTagList(updatedTagList);
    }else{
      console.log("태그 없음")
    }
  },[props.setTag])

  const onKeyPress = e => {
    if (e.target.value.length !== 0 && e.key === 'Enter') {
      submitTagItem()
    }
  }

  const submitTagItem = () => {
    let updatedTagList = [...tagList]
    updatedTagList.push(tagItem)
    setTagList(updatedTagList)
    setTagItem(``)
    props.getTag(updatedTagList)
  }

  const deleteTagItem = e => {
    const deleteTagItem = e.target.parentElement.firstChild.innerText
    const filteredTagList = tagList.filter(tagItem => tagItem !== deleteTagItem)
    setTagList(filteredTagList)
    props.getTag(filteredTagList);
  }

  return (
    <WholeBox>
      <TagBox>
        {tagList.map((tagItem, index) => {
          return (
            <TagItem key={index}>
              <Text>{tagItem}</Text>
              <Button onClick={deleteTagItem}>X</Button>
            </TagItem>
          )
        })}
        <TagInput
          type='text'
          placeholder='Press enter to add tags'
          tabIndex={2}
          onChange={e => setTagItem(e.target.value)}
          value={tagItem || ""}
          onKeyPress={onKeyPress}
          list ="TechStacks"
        />
        <datalist id="TechStacks" style={{width : "300px"}}>
          <option value="Angular"/>
          <option value="Apache"/>
          <option value="AWS"/>
          <option value="C+"/>
          <option value="C++"/>
          <option value="C#"/>
          <option value="Capybara"/>
          <option value="Chai"/>
          <option value="CSS"/>
          <option value="Enzyme"/>
          <option value="Express.JS"/>
          <option value="Go"/>
          <option value="GraphQL"/>
          <option value="HTML"/>
          <option value="Java"/>
          <option value="JavaScript"/>
          <option value="Jest"/>
          <option value="Koa"/>
          <option value="Kotlin"/>
          <option value="Memcached"/>
          <option value="MobX"/>
          <option value="MongoDB"/>
          <option value="MySQL"/>
          <option value="Netty"/>
          <option value="Next.js"/>
          <option value="Nginx"/>
          <option value="Node.js"/>
          <option value="Nuxt.JS"/>
          <option value="Objective-C"/>
          <option value="Oracle"/>
          <option value="PHP"/>
          <option value="PostgresSQL"/>
          <option value="PUMA"/>
          <option value="Python"/>
          <option value="R"/>
          <option value="React"/>
          <option value="Realy"/>
          <option value="Recoil"/>
          <option value="Redis"/>
          <option value="Redux"/>
          <option value="RspecL"/>
          <option value="Ruby"/>
          <option value="Scala"/>
          <option value="SpirngBoot"/>
          <option value="Spring"/>
          <option value="Storybook"/>
          <option value="Styled-Components"/>
          <option value="Swift"/>
          <option value="Thymleaf"/>
          <option value="TRAILBLAZER"/>
          <option value="TypeScript"/>
          <option value="Vue.js"/>
        </datalist>
      </TagBox>
    </WholeBox>
  )
}

const WholeBox = styled.div`
  padding: 10px;
`

const TagBox = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  min-height: 50px;
  max-height : 80px;
  margin: 10px;
  padding: 0 10px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  overflow-y:  scroll;

  &::-webkit-scrollbar {
    display: none;
  }

  &:focus-within {
    border-color: black;
  }
`

const TagItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 5px;
  padding: 5px;
  background-color: black;
  border-radius: 5px;
  color: white;
  font-size: 13px;
`

const Text = styled.span``

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 15px;
  height: 15px;
  margin-left: 5px;
  background-color: white;
  border-radius: 50%;
  color: black;
`

const TagInput = styled.input`
  display: flex;
  width : 250px;
  background: transparent;
  border: none;
  outline: none;
  cursor: text;
`

export default InputTag;