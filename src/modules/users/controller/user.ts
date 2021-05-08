import { Toaster } from '@libs/toaster';
import { IUser } from '@models';
// import { getdialogConfig } from '@modules/Customers/Helper/staticData';
import { IRestResponse } from '@models';
import { services } from '@src/services';
import { useEffect, useState } from 'react';
import { apiActions, limit } from '../helper/staticData';

const { Usersservices: service } = services;

const UserState = () => {
  const [id, setId] = useState('');
  const [page, setPage] = useState(1);
  const [data, setData]: [IUser[], any] = useState([]);
  const [title, setTitle] = useState('');
  const [action] = useState('');
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setisLoading] = useState(false);
  const [totalRecords] = useState(1);
  const [userData, setuserData]: [IUser | undefined, any] = useState();
  const [selectedData, setselectedData]: [IUser[] | undefined, any] = useState([]);
  // const [dialogConfig, setdialogConfig]: [any, any] = useState();
  const [loading, setloading] = useState(true);
  const [modal1, setmodal1] = useState(false);
  const [modal2, setmodal2] = useState(false);
  const [modal3, setmodal3] = useState(false);
  const [modal4, setmodal4] = useState(false);
  const [dialog1, setdialog1] = useState(false);
  // const [customers, setcustomers] = useState([]);
  // const { state } = useAuthConext();

  useEffect(() => {
    setTimeout(() => {
      getAllUsers();
    }, 500);
  }, []);

  const getParams = (filters: any) => {
    const params = `?offset=${limit * (page - 1)}&limit=${limit}`;
    // if (filters?.city) {
    //   params = params.concat(`&city=${filters.city}`);
    // }
    // if (filters?.createdAtFormatted) {
    //   const formatedDate = dayjs(filters?.createdAtFormatted).format('DD-MMM-YYYY');
    //   params = params.concat(`&createdAt=${formatedDate}`);
    // }
    // if (filters?.name) {
    //   params = params.concat(`&name=${filters.name}`);
    // }
    // if (filters?.state) {
    //   filters.state.forEach((item) => {
    //     params = params.concat(`&state=${item}`);
    //   });
    // }
    return params;
  };
  const initializeUser = (res: IRestResponse) => {
    let list: IUser[];
    let count: number;
    if (res && res.data) {
      list = res.data?.rows;
      count = res.data?.count;
      setData([...list]);
      setTotalPages(Math.ceil(count / limit));
    }
  };
  const fetchMore = async (offset: number) => {
    console.log(`?offset=${offset}&limit=${limit}`);
    return await service.getAll(`?offset=${offset}&limit=${limit}`);
  };
  const loadMoreUsers = async (offset: number) => {
    // setisLoading(true);
    // const func = fetchMore;
    // const params = offset;
    // const successMsg = 'Users Fetched';
    // const errorMsg = 'User Cant be Fetched';
    // const { res, err } = await handleAsync({ func, params, successMsg, errorMsg });
    // if (res.success === true) {
    //   const data = res?.data?.rows;
    //   setData([...data]);
    // } else {
    //   Toaster.error({ message: res.message });
    // }
    // // const count = res?.data?.count;
    // // setTotalPages(Math.ceil(count / limit));
    // setisLoading(false);
    // if (data) return true;
    // return false;
    setloading(true);
    // const successMsg = 'Users Fetched';
    const errorMsg = 'Users Cant be Fetched';
    try {
      const res = await fetchMore(offset);
      if (res.success === true) {
        const users = res?.data?.rows;
        setData([...users]);
        return true;
      } else {
        Toaster.error({ message: res.message });
        return false;
      }
    } catch (error) {
      Toaster.error({ message: errorMsg });
      return false;
    } finally {
      setloading(false);
    }
  };
  const getCustomers = async () => {
    // try {
    //   setisLoading(true);
    //   const res = await services.Customersservices.all();
    //   if (res.success === true) {
    //     const list = res.data.map((i: ICustomer) => ({ value: i.id, label: i.firstName }));
    //     console.log(list);
    //     setcustomers([...list]);
    //   } else {
    //     Toaster.error({ message: res.message });
    //   }
    // } catch (err) {
    //   console.log('UserState.getCustomers() error: ', err);
    // } finally {
    //   setisLoading(false);
    // }
  };
  const getAllUsers = async (filters?: any) => {
    try {
      setloading(true);
      const params = getParams(filters);
      console.log('params==>', params);
      const res = await service.getAll(params);
      if (res.success === true) {
        initializeUser(res);
      } else {
        Toaster.error({ message: res.message });
      }
    } catch (err) {
      console.log('UserState.getAllUsers() error: ', err);
    } finally {
      setloading(false);
    }
  };
  const getuser = async (userId: string) => {
    try {
      setisLoading(true);
      const res = await service.get(userId);
      if (res.success === true) {
        setuserData(res.data);
      } else {
        Toaster.error({ message: res.message });
      }
    } catch (err) {
      console.log('UserState.getuser() error: ', err);
    } finally {
      setisLoading(false);
    }
  };
  const createUser = async (user: IUser) => {
    const successMsg = 'User Created Successfully';
    const errorMsg = 'User Cant be Updated';
    try {
      console.log({ user, id });
      setisLoading(true);
      const res = await service.create(user);
      if (res.success === true) {
        Toaster.success({ message: successMsg });
        await getAllUsers();
        closeModal();
      } else {
        Toaster.error({ message: res.message });
      }
    } catch (err) {
      Toaster.error({ message: errorMsg });
      console.log('UserState.createUser() error: ', err);
    } finally {
      setisLoading(false);
    }
  };
  const editUser = async (user: IUser) => {
    const successMsg = 'User Updated Successfully';
    const errorMsg = 'User Cant be Updated';
    try {
      console.log({ user, id });
      setisLoading(true);
      const res: IRestResponse = await service.update({ user, id });
      console.log(res);
      if (res.success === true) {
        Toaster.success({ message: successMsg });
        await getAllUsers();
        closeModal();
      } else {
        Toaster.error({ message: res.message });
      }
    } catch (err) {
      Toaster.error({ message: errorMsg });
      console.log('UserState.editUser() error: ', err);
    } finally {
      setisLoading(false);
    }
  };
  const deleteUser = async () => {
    const successMsg = 'User Deleted Successfully';
    const errorMsg = 'User Cant be Deleted';
    try {
      setisLoading(true);
      const res = await service.delete(id);
      if (res.success === true) {
        Toaster.success({ message: successMsg });
        await getAllUsers();
        closeDialog();
      } else {
        Toaster.error({ message: res.message });
      }
    } catch (err) {
      Toaster.error({ message: errorMsg });
      console.log('UserState.deleteUser() error: ', err);
    } finally {
      setisLoading(false);
    }
  };
  const setPassword = async (passwordData: any) => {
    const successMsg = 'Password Reset Successfully';
    const errorMsg = 'Password Cant be Reset';
    try {
      setisLoading(true);
      console.log({ id, ...passwordData });
      const res = await service.resetPassword({ id, ...passwordData });
      if (res.success === true) {
        Toaster.success({ message: successMsg });
        closeModal();
      } else {
        Toaster.error({ message: res.message });
      }
    } catch (err) {
      Toaster.error({ message: errorMsg });
      console.log('UserState.setPassword() error: ', err);
    } finally {
      setisLoading(false);
    }
  };
  const setRole = async (roleData: any) => {
    try {
      setisLoading(true);
      // const successMsg = 'Role set Successfully';
      // const errorMsg = 'Role Cant be set';
      // const res: any = await service.getuserById(id);
    } catch (err) {
      console.log('UserState.setRole() error: ', err);
    } finally {
      setisLoading(false);
    }
  };
  const assign = async (assignData: any) => {
    try {
      setisLoading(true);
      // const successMsg = 'Assign Customer Successfully';
      // const errorMsg = 'Customer Cant be Assign';
      // const res: any = await service.getuserById(id);
    } catch (err) {
      console.log('UserState.assign() error: ', err);
    } finally {
      setisLoading(false);
    }
  };
  // Table functions
  const filter = (headerName: string, order: boolean) => {
    setloading(true);
    const sortedData = [...data];
    sortedData.sort((a, b) => {
      const x = a[headerName]?.toString()?.toLowerCase();
      const y = b[headerName]?.toString()?.toLowerCase();
      const asc = x > y ? 1 : x < y ? -1 : 0;
      const desc = x > y ? -1 : x < y ? 1 : 0;
      return order ? desc : asc;
    });
    setData([...sortedData]);
    setloading(false);
  };
  const changePage = (currentPage: number) => {
    if (page === currentPage) {
      return;
    }
    setloading(true);
    setPage(currentPage);
    setTimeout(() => {
      if (loadMoreUsers(limit * (currentPage - 1))) {
      }
    }, 1000);
  };
  const handleCheckBox = (list: any[]) => {
    console.log(list);
    setselectedData([...list]);
  };
  // Form Functions
  const handleSave = (task: string, event: any) => {
    switch (task) {
      case apiActions.CREATE:
        createUser(event);
        break;
      case apiActions.DELETE:
        deleteUser();
        break;
      case apiActions.SET_PASSWORD:
        setPassword(event);
        break;
      case apiActions.SET_ROLE:
        setRole(event);
        break;
      case apiActions.EDIT:
        editUser(event);
        break;
      case apiActions.ASSIGN:
        assign(event);
        break;
      default:
        break;
    }
  };
  // Modal functions
  const openModal = async (task: string, usersData?: IUser) => {
    if (usersData) {
      setId(usersData.id);
    }
    switch (task) {
      case apiActions.CREATE:
        setTitle('Add User');
        setuserData({});
        setmodal1(true);
        break;
      case apiActions.EDIT:
        setTitle('Edit User');
        setmodal1(true);
        setuserData(usersData);
        // if (usersData) {
        //   await getuser(usersData.id);
        // }
        break;
      case apiActions.SET_PASSWORD:
        setmodal2(true);
        break;

      case apiActions.SET_ROLE:
        setmodal3(true);
        break;

      case apiActions.ASSIGN:
        getCustomers();
        setmodal4(true);
        break;

      default:
        break;
    }
  };

  const closeModal = () => {
    console.log('closing modals');

    setmodal1(false);
    setmodal2(false);
    setmodal3(false);
    setmodal4(false);
  };
  // Dialog Functions
  const closeDialog = () => {
    console.log('closing dialog');

    setdialog1(false);
  };
  const openDialog = (task: string, user: IUser) => {
    // const Config = getdialogConfig(action);
    // setdialogConfig(Config);
    switch (task) {
      case apiActions.DELETE:
        setId(user.id);
        setdialog1(true);
        break;
      default:
        break;
    }
  };

  return {
    totalPages,
    loading,
    userData,
    page,
    data,
    action,
    // dialogConfig,
    modal1,
    modal2,
    modal3,
    modal4,
    // customers,
    dialog1,
    totalRecords,
    title,
    selectedData,
    isLoading,
    getuser,
    openDialog,
    handleCheckBox,
    closeDialog,
    handleSave,
    changePage,
    openModal,
    closeModal,
    filter
  };
};

export default UserState;
