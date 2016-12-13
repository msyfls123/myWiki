draft-js
==

### live demo
[g.ebichu.cc/editor](http://g.ebichu.cc/editor)

### 概念
+ `Editor`
+ `EditorState` this.state.editorState
+ `ContentState` getCurrentContent()
+ `ContentBlock` getBlockMap() getBlockForKey(key)
+ `SelectionState` EditorState.getSelection()
  + getStartKey()
  + getStartOffset()
  + getEndKey()
  + getEndOffset()
+ 创造实体/插入Block/应用到Block的Char上 `Entity`
  create() AtomicBlockUtils.insertAtomicBlock(...)
  ```
  function applyEntityToContentBlock(
    contentBlock: ContentBlock,
    start: number,
    end: number,
    entityKey: ?string
  ): ContentBlock {
    var characterList = contentBlock.getCharacterList();
    while (start < end) {
      characterList = characterList.set(
        start,
        CharacterMetadata.applyEntity(characterList.get(start), entityKey)
      );
      start++;
    }
    return contentBlock.set('characterList', characterList);
  }
  ```
+ 自定义块元素 `blockRendererFn()`  
  (contentBlock) => {component:XXX, editable: false, props: {...}}   
  [See](http://facebook.github.io/draft-js/docs/advanced-topics-block-components.html#content)
+ 自定义块样式 `blockStyleFn={myBlockStyleFn}`  
  [See](http://facebook.github.io/draft-js/docs/advanced-topics-block-styling.html#content)
+ 自定义行内元素 `CompositeDecorator`  
  createWithContent(contentState, decorator)  
  [See](http://facebook.github.io/draft-js/docs/advanced-topics-decorators.html#content)
+ 自定义行内样式 `customStyleMap={styleMap}`  
  [See](http://facebook.github.io/draft-js/docs/advanced-topics-inline-styles.html#content)

### 保存/读取
+ `convertFromRaw` convertFromRaw(rawState: RawDraftContentState): ContentState
+ `convertToRaw` convertToRaw(contentState: ContentState): RawDraftContentState

### 拖拽图片
+ `onDragStart` 设置 `dataTransfer` `BLOCK_KEY`
+ `handleDrop`  
  handleDrop?: (selection: SelectionState, dataTransfer: Object, isInternal: DraftDragType) => DraftHandleValue
