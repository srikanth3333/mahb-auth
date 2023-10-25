import {useRef, useState} from 'react';
import { Input,Select, DatePicker, Spin, InputNumber, Divider, Space, Form,Radio,
        Checkbox,Row,Col,TimePicker,Slider} from 'antd';
import FileUpload from './FileUpload';
// import {useDispatch,useSelector} from 'react-redux';
import moment from 'moment';
// import Messages from "./Messages";
// import axios from 'axios';

const { TextArea } = Input;

function FormComponent({title,objectData,postUrl,data,refreshApi,
    handleFormEdits,setFilters,selectLoading,staticData,colFix,edit,labelsTrue}) {

  const [objArr, setObjArr] = useState(objectData)
  const [FormObj, setFormObj] = useState([])
  const [showMessage, setShowMessage] = useState(false);
  const [loading,setLoading] = useState(false);
  const [editable,setEditable] = useState({key:'',status:false});
//   const user = useSelector((state) => state.users) 

//   let dispatch = useDispatch();

  const [form] = Form.useForm();
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [finalObjArr, setFinalObjArr] = useState([])
  const inputRef = useRef(null);
  const onNameChange = (event) => {
    setName(event.target.value);
  };
  const addItem = (e) => {
    e.preventDefault();
    setItems([...items, name || `New item ${index++}`]);
    setName('');
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };
  
  const onChangeHandler = (val,lop,item) => {
    let findObj = FormObj.find(obj => obj.value == item.value)
    console.log(findObj);
    if(findObj) {
        findObj["answer"] = val
        return;
    }
    item["answer"] = val
    let finalObj = item
    setFormObj([...FormObj, finalObj ])
    setFilters({...objArr, [lop]:val})
    setObjArr({...objArr, [lop]:val})
  }

  console.log(FormObj)

  const handleSubmit = (values) => {
    // console.log(data)
    // console.log(objArr)
    // console.log(values)
    alert("Form Submitted Successfully")
    
  }

  const handleLabelEdit = (e,key) => {
    let objIndex = data.findIndex((item) => {
        return key == item.value 
    }) 
    data[objIndex].label = e.target.value
    setFinalObjArr(data)
    // console.log(data)
  }

  const onFinishFailed = (errorInfo) => {
    // console.log('Failed:', errorInfo);
    // handle form submission failure logic here
  };


  let itemData = data.map((item) => {
    let name = item.label;
    let value = !item.defaultValue ? '' : item.defaultValue;
    return {name,value}
  })

  const validateMessages = {
    required: '${label} is required!',
    types: {
      email: '${label} is not a valid email!',
    },
  };

  const handleEdit = (status,value,label) => {
    setEditable({status:status,key:value,label:label})
  }

//   console.log(editable)

  return (
    <>
        <Form 
            form={form}
            name="basic"
            // initialValues={{ remember: true }}
            initialValues={{
                clientName:"test"
            }}
            onFinishFailed={onFinishFailed}
            validateMessages={validateMessages}
            onFinish={handleSubmit} 
            className="row align-items-center" 
            fields={edit == true ? itemData : []} 
        >
            <div className="col-lg-12">
                <div className="d-flex justify-content-center align-items-center flex-wrap">
                    <h3 className="filter-card-title">{title}</h3>
                </div>
            </div>
            {
                data && data.map((item, i) => {
                    if(item.type == "text") {
                        return (
                            <>
                                <div className={!colFix ? 'col-lg-3' : colFix}>
                                    <label htmlFor="">{item.label}</label>
                                    <Form.Item 
                                        name={item.label}
                                        rules={[{ required: item.required, message: `Please input your ${item.label}` }]}
                                    >
                                        <Input 
                                            placeholder={item.label} 
                                            allowClear
                                            //    required={true}
                                            showCount={item.showCount}
                                            maxLength={item.maxLength}
                                            name={item.label}
                                            value={objArr && objArr[item.value]}
                                            onChange={(val) => onChangeHandler(val.target.value,item.value,item)} 
                                            
                                        />
                                    </Form.Item>
                                </div>
                                
                            </>
                        )
                    }else if(item.type === 'textarea') {
                        return (
                            <>
                                <div className={!colFix ? 'col-lg-3' : colFix}>
                                    <label htmlFor="">{item.label}</label>
                                    <Form.Item 
                                        name={item.label}
                                        rules={[{ required: item.required, message: `Please input your ${item.label}` }]}
                                    >
                                        <TextArea  
                                            placeholder={item.label} 
                                            allowClear
                                            //    required={true}
                                            showCount={item.showCount}
                                            maxLength={item.maxLength}
                                            name={item.label}
                                            value={objArr && objArr[item.value]}
                                            onChange={(val) => onChangeHandler(val.target.value,item.value)} 
                                            
                                        />
                                    </Form.Item>
                                </div>
                                
                            </>
                        )
                    }else if (item.type == "number") {
                        return (
                            <>
                                <div className={!colFix ? 'col-lg-3' : colFix}>
                                    <label htmlFor="">{item.label}</label> <br />
                                    <Form.Item name={item.label}
                                        rules={[{ required: item.required, message: `Please input your ${item.label}` }]}
                                        >
                                        <InputNumber  
                                            prefix={!item.prefix ? "" : "₹"} width="400px" min={item.min} max={item.max} defaultValue={item.min} onChange={(val) => onChangeHandler(val,item.value)} 
                                            
                                        />
                                    </Form.Item>
                                </div>
                            </>
                        )
                    }else if(item.type == "select") {
                        return (
                            <>
                             <div className={!colFix ? 'col-lg-3' : colFix}>
                                <label htmlFor="">{item.label}</label>
                                    {
                                        staticData == true
                                        ?
                                        <Form.Item name={item.label}
                                        rules={[{ required: item.required, message: `Please input your ${item.label}` }]}
                                        >
                                            <Select
                                            // required={true}
                                                allowClear
                                                placeholder={item.label}
                                                showSearch
                                                value={objArr && objArr[item.value]}
                                                style={{ width: '100%' }}
                                                onChange={(val) => onChangeHandler(val,item.value,item)}
                                                mode={!item.multiple ? false :"multiple"}
                                                >
                                                {
                                                    item.filterList?.map((val, index) => (
                                                        <Select.Option value={val} key={index}> 
                                                            {val}
                                                        </Select.Option>
                                                    ))
                                                }
                                                
                                            </Select>
                                        </Form.Item>
                                        :
                                        labelsTrue == true ?
                                            <Form.Item name={item.label}
                                                rules={[{ required: item.required, message: `Please input your ${item.label}` }]}
                                                >
                                                <Select
                                                    allowClear
                                                    showSearch
                                                    // required={true}
                                                    loading={selectLoading}
                                                    value={objArr && objArr[item.value]}
                                                    style={{ width: '100%' }}
                                                    notFoundContent={selectLoading ? <Spin size="small" /> : null}
                                                    onChange={(val) => onChangeHandler(val,item.value,item)}
                                                    mode={!item.multiple ? false :"multiple"}
                                                    >
                                                    {
                                                        selectLoading ?
                                                            <Select.Option style={{textAlign: 'center'}}> 
                                                                <Spin size="small" />
                                                            </Select.Option>
                                                        : item.filterList?.map((val, index) => (
                                                            <Select.Option value={val.value} key={index}> 
                                                                {val.label}
                                                            </Select.Option>
                                                        ))
                                                    }
                                                    
                                                </Select>
                                                </Form.Item>
                                        :
                                        <Form.Item name={item.label}
                                        rules={[{ required: item.required, message: `Please input your ${item.label}` }]}
                                        >
                                        <Select
                                            allowClear
                                            showSearch
                                            // required={true}
                                            loading={selectLoading}
                                            value={objArr && objArr[item.value]}
                                            style={{ width: '100%' }}
                                            notFoundContent={selectLoading ? <Spin size="small" /> : null}
                                            onChange={(val) => onChangeHandler(val,item.value,item)}
                                            mode={!item.multiple ? false :"multiple"}
                                            >
                                            {
                                                selectLoading ?
                                                    <Select.Option style={{textAlign: 'center'}}> 
                                                        <Spin size="small" />
                                                    </Select.Option>
                                                : item.filterList?.map((val, index) => (
                                                    <Select.Option value={val} key={index}> 
                                                        {val}
                                                    </Select.Option>
                                                ))
                                            }
                                            
                                        </Select>
                                        </Form.Item>
                                    }
                                    
                                </div>
                            </>
                        )
                    }else if(item.type === 'date') {
                        return (
                            <>
                                <div className={!colFix ? 'col-lg-3' : colFix}>
                                    <label htmlFor="">{item.label}</label>
                                    <Form.Item name={item.label}
                                    rules={[{ required: item.required, message: `Please input your ${item.label}` }]}
                                    >
                                    <DatePicker  
                                        allowClear
                                        // required={true}
                                        value={objArr && objArr[item.value] != "" && objArr[item.value] != "Invalid date" ? moment(objArr && objArr[item.value]) : ""}
                                        format="DD-MM-YYYY" 
                                        style={{width:'100%'}} 
                                        
                                        onChange={(date,dateString) => {
                                            // let finalDate = moment(date).format('YYYY-MM-DD')
                                            // if(finalDate == "Invalid date") {
                                            //     return onChangeHandler('',item.value)
                                            // }else {
                                            //     return onChangeHandler(finalDate,item.value)
                                            // }
                                        }} />
                                        </Form.Item>
                                </div>
                            </>
                        )
                    }else if(item.type === 'time') {
                        return (
                            <>
                                <div className={!colFix ? 'col-lg-3' : colFix}>
                                    <label htmlFor="">{item.label}</label>
                                    <Form.Item name={item.label}
                                        rules={[{ required: item.required, message: `Please input your ${item.label}` }]}
                                        >
                                        <TimePicker  />
                                    </Form.Item>
                                </div>
                            </>
                        )
                    }else if(item.type === "radio") {
                        return (
                            <>
                                <div className={!colFix ? 'col-lg-3' : colFix}>
                                    <label htmlFor="">{item.label}</label>
                                    <Form.Item name={item.label}
                                            rules={[{ required: item.required, message: `Please input your ${item.label}` }]}
                                        >
                                                <Radio.Group onChange={() => {

                                                }} 
                                                    value={objArr && objArr[item.value] != "" && objArr[item.value] != "Invalid date" ? moment(objArr && objArr[item.value]) : ""}
                                                >
                                                    <Space direction="vertical">
                                                        <Radio value={1}>Option A</Radio>
                                                        <Radio value={2}>Option B</Radio>
                                                        <Radio value={3}>Option C</Radio>
                                                        <Radio value={4}>Option D</Radio>
                                                    </Space>
                                                </Radio.Group>
                                                                                    
                                    </Form.Item>
                                </div>
                            </>
                        )
                    }else if(item.type === "radioGrid") {

                        return (
                            <>
                                <div className={!colFix ? 'col-lg-3' : colFix}>
                                    <label htmlFor="">{item.label}</label>
                                    <Form.Item name={item.label}
                                            rules={[{ required: item.required, message: `Please input your ${item.label}` }]}
                                        >
                                            <div className="row">
                                                {
                                                        item.radioGrid.map((grid,index) => (
                                                            <div className="col-lg-4" key={index}>
                                                                    <Radio.Group onChange={() => {

                                                                    }} 
                                                                        value={objArr && objArr[item.value] != "" && objArr[item.value] != "Invalid date" ? moment(objArr && objArr[item.value]) : ""}
                                                                    >
                                                                        <Space direction="vertical">
                                                                            <Radio value={'abc'}>Option A</Radio>
                                                                            <Radio value={"abcd"}>Option B</Radio>
                                                                            <Radio value={"abcde"}>Option C</Radio>
                                                                            <Radio value={"abccdef"}>Option D</Radio>
                                                                        </Space>
                                                                    </Radio.Group>
                                                            </div>
                                                        ))
                                                }

                                            </div>

                                                                                    
                                    </Form.Item>
                                </div>
                            </>
                        )

                    }else if (item.type === "checkbox") {
                        return (
                            <>
                                <div className={!colFix ? 'col-lg-3' : colFix}>
                                    <label htmlFor="">{item.label}</label>
                                    <Form.Item name={item.label}
                                            rules={[{ required: item.required, message: `Please input your ${item.label}` }]}
                                        >
                                               <Checkbox.Group
                                                    style={{
                                                        width: '100%',
                                                    }}
                                                    onChange={(val) => onChangeHandler(val,item.value,item)}
                                                >
                                                    <Row>
                                                    <Col span={8}>
                                                        <Checkbox value="A">Some Text 1</Checkbox>
                                                    </Col>
                                                    <Col span={8}>
                                                        <Checkbox value="B">Some Text 2</Checkbox>
                                                    </Col>
                                                    <Col span={8}>
                                                        <Checkbox value="C">Some Text 3</Checkbox>
                                                    </Col>
                                                    <Col span={8}>
                                                        <Checkbox value="D">Some Text 4</Checkbox>
                                                    </Col>
                                                    <Col span={8}>
                                                        <Checkbox value="E">Some Text 5</Checkbox>
                                                    </Col>
                                                    </Row>
                                                </Checkbox.Group>
                                                                                    
                                    </Form.Item>
                                </div>
                            </>
                        )
                        
                    }else if(item.type === "checkboxGrid") {

                        return (
                            <>
                                <div className={!colFix ? 'col-lg-3' : colFix}>
                                    <label htmlFor="">{item.label}</label>
                                    <Form.Item name={item.label}
                                            rules={[{ required: item.required, message: `Please input your ${item.label}` }]}
                                        >
                                            <div className="row">
                                                {
                                                        item.radioGrid.map((grid,index) => (
                                                            <div className="col-lg-4" key={index}>
                                                                    <Checkbox.Group
                                                                            style={{
                                                                                width: '100%',
                                                                            }}
                                                                            // onChange={onChange}
                                                                        >
                                                                            <Row>
                                                                            <Col span={12}>
                                                                                <Checkbox value="A">Some Text 1</Checkbox>
                                                                            </Col>
                                                                            <Col span={12}>
                                                                                <Checkbox value="B">Some Text 2</Checkbox>
                                                                            </Col>
                                                                            <Col span={12}>
                                                                                <Checkbox value="C">Some Text 3</Checkbox>
                                                                            </Col>
                                                                            </Row>
                                                                        </Checkbox.Group>
                                                            </div>
                                                        ))
                                                }

                                            </div>

                                                                                    
                                    </Form.Item>
                                </div>
                            </>
                        )

                    }else if(item.type === 'fileUpload') {
                        return (
                            <>
                                <div className={!colFix ? 'col-lg-3' : colFix}>
                                    <label htmlFor="">{item.label}</label>
                                    <FileUpload />
                                </div>
                            </>
                        )
                    } else if(item.type === 'linearScale') {
                        return (
                            <>
                                <div className={!colFix ? 'col-lg-3' : colFix}>
                                    <label htmlFor="">{item.label}</label>
                                        <Slider
                                            defaultValue={30}
                                            tooltip={{
                                            open: true,
                                            }}
                                        />
                                </div>
                            </>
                        )
                    }

    
                })
            }
            {
                data && data.length > 0 ?
                <div className={'col-lg-12 text-left mt-3'}>
                    <button  disabled={loading} className='mb-2 btn btn-success' type="submit">
                        Save Changes
                    </button>
                </div> : null
            }
            
        </Form>
    </>
  )
}

export default FormComponent