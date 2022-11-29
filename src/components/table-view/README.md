## 参数

| 参数名            | 说明                                    | 参数类型                      | 默认值                     |
| ----------------- | --------------------------------------- | ----------------------------- | -------------------------- |
| columnsFields     | columns                                 | Array                         | -                          |
| selectionType     | 多选/单选                               | checkbox / radio              | -                          |
| pagination        | 自定义分页                              | object                        | {pageSize:10,pageIndex:1}  |
| getSearchParams   | 搜索条件                                | object                        | -                          |
| rowKey            | table key                               | string                        | id                         |
| size              | table size                              | string                        | default \| middle \| small |
| scrollX           | 滚动                                    | number                        | -                          |
| height            | table height                            | number                        | -                          |
| api               | 接口                                    | string \| url                 | -                          |
| usePagination     | 是否需要分页                            | boolean                       | true                       |
| onParamsChange    | 查询参数变化事件，包括分页 (一般不需要) | object                        | -                          |
| onSelectionChange | 选择回调                                | ({ selection, keys }) => void |
| selectShowKey     | 展示的 key                              | Array                         | []                         |
| rowSelection      | rowSelection                            | 参考 table-rowSelection       | true                       |
| bordered          | 表格                                    | boolean                       | false                      |
| showAlert         | 是否展示选中的条数                      | boolean                       | false                      |
| pageIndexCode     | 分页 key                                | string                        | "pageIndex"                |
| pageSizeCode      | 分页 key                                | string                        | "pageSize"                 |
| tableCode         | table key                               | string                        | "list"                     |
| totalCode         | 总数 key                                | string                        | "totalCount"               |

## 方法(fn)

1. `onSelectionChange` 多选/单选 ，对应代码

```
const onSelectionChange = (selection, keys) => {
    console.log("已经选中的行", selection, keys);
    // setSelectCount(keys);
  };

  <TableView
    ...
    columnsFields={columns}
    rowKey={"messageId"}
    selectionType={"checkbox"}
    onSelectionChange={onSelectionChange}
    rowKey={"messageId"}
    />

```

2. `tableRef.current.reset()` 重置、刷新、搜索

```
 // formParams 搜索参数
  const [formParams, setPostParams] = useState({});
 const tableRef = useRef(null);
 useEffect(() => {
    tableRef.current.reset();
  }, [formParams]);

  <TableView
    ...
    api={postPushFailDataList}
    getSearchParams={formParams}
    ref={tableRef}
    rowKey={"messageId"}
    />

```

### 部分参数说明

1. `pageIndexCode`、`pageSizeCode`、`tableCode`、`totalCode`，这四个参数为自定义`key`值参数，方便应对不同接口返回数据对应不同的`key`。
