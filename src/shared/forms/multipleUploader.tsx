// import { saveAs } from 'file-saver';
// import React, { FC, Fragment, memo, useCallback, useEffect, useState } from 'react';
// import { useDropzone } from 'react-dropzone';
// import * as Feather from 'react-feather';
// import { Controller } from 'react-hook-form';
// import axios from 'axios';
// import { Label } from '.';
// import Spinner from '../spinner/clipLoader';
// const STATIC_FILES_URL =
//   process.env.END_POINT + '/tmp/' || 'http://api.metis.apps.actonatepanel.com/tmp/';
// const API_URL = process.env.END_POINT || 'http://api.metis.apps.actonatepanel.com/';
// const UPLOAD_URL = `${API_URL}/upload/file`;
// const S3PATH = 'https://metis-act.s3-ap-southeast-1.amazonaws.com/media/';
// // const query = gql`
// //   mutation($src: String!) {
// //     Users {
// //       removeMedia(src: $src)
// //     }
// //   }
// // `;

// // styles
// // const thumbsContainer = {
// //   display: 'flex'
// //   // flexDirection: 'row',
// //   // flexWrap: 'wrap',
// //   // marginTop: 16
// // };
// const thumb = {
//   display: 'inline-flex',
//   borderRadius: 2,
//   // border: '1px solid #eaeaea',
//   marginBottom: 4,
//   marginRight: 8,
//   width: 100,
//   height: 100,
//   padding: 4
//   // boxSizing: 'border-box'
// };
// const thumbInner = {
//   display: 'flex',
//   minWidth: 0,
//   justifyContent: 'center',
//   overflow: 'hidden'
// };
// const img = {
//   // display: 'block',
//   width: 'auto',
//   height: '100%'
// };

// type ImageDropZoneProps = {
//   label?: string;
//   constraint?: string;
//   displayOnly?: boolean;
//   className?: string;
//   onUpload?: Function;
//   onError?: Function;
//   setValue?: any;
//   value?: any[];
//   name?: string;
//   labelClass?: string;
//   children?: any;
//   wrapperClass?: string;
//   onChange?: any;
//   path?: string;
//   minSize?: number;
//   files?: any[];
//   setFiles?: Function;
//   required?: boolean;
//   serverFile?: any[];
//   setserverFile?: Function;
//   maxSize?: number;
//   accept?: string | string[];
// };
// let arrr: any = [];
// let serarrr: any = [];
// const MultipleDropZone: FC<ImageDropZoneProps> = (props) => {
//   const [errMsg, seterrMsg] = useState('');
//   const [errors, seterrors] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [files, setFiles] = useState([]);
//   const [state, setstate] = useState(true);
//   const [serverFile, setserverFile] = useState([]);
//   // const [removeImage] = useMutation(query);
//   const accept = props.accept || '';
//   const minSize = props.minSize || 0;
//   const maxSize = props.maxSize || 10242880;
//   const disabled = props.displayOnly || false;
//   const constraint = props.constraint || 'PNG, JPG, GIF up to 10MB';
//   const useDropZoneProps = { accept, minSize, maxSize, disabled };

//   useEffect(() => {
//     if (props.value?.length > 0 && files.length <= 0 && state) {
//       setstate(false);
//       arrr = [...props.value];
//       serarrr = [...props.value];
//       setFiles([...props.value]);
//       setserverFile([...props.value]);
//     }
//   }, [props.value]);
//   const onDrop = useCallback(async (acceptedFiles) => {
//     setLoading(true);
//     try {
//       for (let index = 0; index < acceptedFiles.length; index++) {
//         const file = acceptedFiles[index];
//         const { name: caption, size } = file;
//         const filename = await upload(file);
//         const arr = [...arrr];
//         let serverarr = [...serarrr];
//         const serarrrprops = {
//           filename,
//           size,
//           caption,
//           download_url: S3PATH + props.path + filename
//         };
//         const arrprops = { caption, size, filename };
//         serarrr.push(serarrrprops);
//         arr.push(arrprops);
//         arrr = arr;
//         serverarr = serarrr;
//         setFiles([...arr]);
//         setserverFile([...serverarr]);
//         const respone = props.name ? { [props.name]: filename, file: name } : filename;
//         props.onUpload && props.onUpload(respone);
//         props.onChange(filename);
//         props.setValue(props.name, serverarr);
//       }
//     } catch (error) {
//       seterrors(true);
//       seterrMsg(error);
//       setFiles([]);
//       props.setValue(props.name, null);
//       props.onError && props.onError(error);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   const upload = (file: any): Promise<any> => {
//     return new Promise((resolve, reject) => {
//       const req = request.post(UPLOAD_URL);
//       req.attach('file', file);
//       req.end((err, res) => {
//         if (err) {
//           console.log('Error', err);
//           seterrors(true);
//           setFiles([]);
//           reject(err);
//         } else {
//           seterrors(false);
//           // console.log('Response', res);
//           const body = res?.body;
//           if (body?.code === 'FILE_UPLOADED') {
//             resolve(body?.file);
//           } else {
//             reject(body?.code);
//           }
//         }
//       });
//     });
//   };
//   const { fileRejections, getRootProps, getInputProps } = useDropzone({
//     onDrop,
//     ...useDropZoneProps
//   });

//   const remove = async (src: string, size: string) => {
//     if (size) {
//       if (serverFile) {
//         const variables = { src };
//         const params = { variables };
//         // const func = removeImage;
//         const successMsg = 'Image deleted Sucessfully';
//         const errorMsg = 'Image Cant be deleted';
//         // const { res, err } = await handleAsync({ func, params, successMsg, errorMsg });
//         // const data = res?.Users?.removeMedia;
//         let arr = [...files];
//         let serverarr = [...serverFile];
//         arr = arr.filter((it) => it.filename !== src);
//         serverarr = serverarr.filter((it) => it.filename !== src);
//         setFiles([...arr]);
//         setserverFile([...serverarr]);
//         arrr = arr;
//         serarrr = serverarr;
//         serverarr.length > 0
//           ? props.setValue(props.name, serverarr)
//           : props.setValue(props.name, null);
//       } else {
//         props.setValue(props.name, null);
//       }
//     } else {
//       let arr = [...files];
//       let serverarr = [...serverFile];
//       arr = arr.filter((it) => it.filename !== src);
//       serverarr = serverarr.filter((it) => it.filename !== src);
//       setFiles([...arr]);
//       setserverFile([...serverarr]);
//       arrr = arr;
//       serarrr = serverarr;
//       serverarr.length > 0
//         ? props.setValue(props.name, serverarr)
//         : props.setValue(props.name, null);
//     }
//   };
//   const download = (src: string, name: string, size: string, url: string) => {
//     size ? saveAs(STATIC_FILES_URL + src, name) : saveAs(url, name);
//   };

//   return (
//     <section className={props.className || ''}>
//       <div {...getRootProps({ className: 'dropzone' })}>
//         <input {...getInputProps()} />
//         <Label
//           className={props.labelClass || 'block  text-sm font-medium pr-8 leading-5 text-gray-500'}
//           label={props.label}
//           required={props.required}
//         />
//         <div
//           className={
//             !disabled
//               ? props.wrapperClass ||
//                 'flex justify-center hover:border-blue-400 px-6 pr-8 pt-1 pb-1 border-2 border-gray-300 border-dashed rounded-md'
//               : 'mt-2'
//           }
//         >
//           <div className="text-center">
//             {loading ? (
//               <Spinner />
//             ) : errors ? (
//               <Image errorImg={'/img/error.png'} imageUrl="" />
//             ) : (
//               !disabled && (props.children || <Icon constraint={constraint} />)
//             )}
//           </div>
//         </div>
//       </div>
//       {files.length > 0 && !loading && (
//         <FileName
//           serverFile={serverFile}
//           files={files}
//           disabled={disabled}
//           path={props.path}
//           download={download}
//           remove={remove}
//         />
//       )}
//       {errors && !(fileRejections.length > 0) && (
//         <Message message={errMsg || 'Something Went Wrong, Check Network!'} />
//       )}
//       {fileRejections.length > 0 && <Message message="File type not accepted, sorry!" />}
//     </section>
//   );
// };
// const GetImage: FC<any> = memo((props) => {
//   const { file } = props;
//   let image = '';
//   if (file?.includes('.pdf')) {
//     image = '/img/pdf.png';
//   } else if (file?.includes('.doc')) {
//     image = '/img/word1.png';
//   } else if (file?.includes('.xlsx')) {
//     image = '/img/xl-3.png';
//   } else if (file?.includes('.ppt')) {
//     image = '/img/ppt.png';
//   } else if (file?.includes('.txt')) {
//     image = '/img/text.png';
//   } else {
//     image = '/img/png3.png';
//   }
//   return <img className="h-7 w-7" src={image} alt="" />;
// });
// const FileName: FC<any> = memo((props) => {
//   const { files, download, remove, disabled } = props;
//   return (
//     <div className="mt-2">
//       {disabled && <hr />}
//       {files.map((item, index) => {
//         return (
//           <Fragment key={index}>
//             <div className="mt-2 mb-1 flex justify-between items-center">
//               <span className="flex space-x-3 items-center">
//                 <p className="text-gray-700 text-sm">{index + 1 + '.'}</p>
//                 <div className="flex space-x-2">
//                   <div className="flex -mt-1 items-center justify-center">
//                     <GetImage file={item.caption} />
//                   </div>
//                   <div className="">
//                     <p className="text-gray-800 text-xs">{item?.caption}</p>
//                     {/* {item?.size && (
//                       <p className="text-gray-500 text-xs"> &nbsp;{'- ' + niceBytes(item?.size)}</p>
//                     )} */}
//                   </div>
//                 </div>
//               </span>
//               <div className="flex -mt-2 ">
//                 <a
//                   href={item.size ? `${STATIC_FILES_URL}${item?.filename}` : `${item.download_url}`}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="cursor-pointer"
//                   download={
//                     item.size ? `${STATIC_FILES_URL}${item?.filename}` : `${item.download_url}`
//                   }
//                 >
//                   <Feather.Eye
//                     size="24"
//                     className="text-gray-600 cursor-pointer rounded-full p-1 hover:bg-gray-200 hover:text-gray-700"
//                   />
//                 </a>
//                 {/* <Feather.Download
//                   size="24"
//                   className="text-gray-600 cursor-pointer rounded-full p-1 hover:bg-gray-200 hover:text-gray-700"
//                   onClick={() =>
//                     download(item?.filename, item?.caption, item.size, item.download_url)
//                   }
//                 /> */}
//                 {!disabled && (
//                   <Feather.Trash2
//                     size="24"
//                     className="text-gray-600 cursor-pointer rounded-full p-1 hover:bg-gray-200 hover:text-gray-700"
//                     onClick={() => remove(item?.filename, item.size)}
//                   />
//                 )}
//               </div>
//             </div>
//             <hr />
//           </Fragment>
//         );
//       })}
//     </div>
//   );
// });
// type ImageProps = {
//   imageUrl: string;
//   errorImg?: string;
// };
// const Image = ({ imageUrl, errorImg = '' }: ImageProps) => {
//   const image = errorImg ? errorImg : imageUrl || '/img/succes.png';
//   return (
//     <div style={thumb}>
//       <div style={thumbInner}>
//         <img src={image} style={img} />
//       </div>
//     </div>
//   );
// };
// const Message = ({ message }: { message: string }) => {
//   // seterrors(true);
//   return (
//     <div className="mt-2 flex justify-between items-center">
//       <span className="text-red-400 leading-4 text-sm font-sm">{message}</span>
//       <span />
//     </div>
//   );
// };
// const Icon = ({ constraint }: { constraint: string }) => {
//   return (
//     <>
//       <div className="flex justify-center">
//         <Feather.UploadCloud color="#4299E1" />
//       </div>
//       <p className="mt-1 text-sm text-gray-600">
//         <button
//           type="button"
//           className="font-medium text-blue-500 hover:text-blue-600 text-xs focus:outline-none focus:underline transition duration-150 ease-in-out"
//         >
//           {constraint || 'Upload Document'}
//         </button>
//       </p>
//     </>
//   );
// };
// type ReactDropZoneProps = {
//   label?: string | undefined;
//   displayOnly?: boolean;
//   constraint?: string;
//   className?: string;
//   onUpload?: Function;
//   onError?: Function;
//   imageUrl?: any[];
//   labelClass?: string;
//   name: string | undefined;
//   wrapperClass?: string;
//   required?: boolean;
//   children?: any;
//   errors?: any;
//   clearErrors?: any;
//   onChange?: Function;
//   setValue: any;
//   path?: string;
//   rules?: any;
//   minSize?: number;
//   maxSize?: number;
//   accept?: string | string[];
//   control: any;
// };
// const MultipleReactDropZone: FC<ReactDropZoneProps> = (props) => {
//   const [state, setstate] = useState(true);
//   const { control, errors, setValue, imageUrl, name, onChange, rules } = props;
//   const handleChange = (data: any) => {
//     setValue(name, data, { shouldDirty: true });
//     onChange && onChange(data);
//     props.clearErrors && props.clearErrors(name);
//   };
//   useEffect(() => {
//     if (imageUrl && imageUrl.length > 0 && state) {
//       setstate(false);
//       setValue(name, imageUrl);
//     } else if (serarrr.length > 0) {
//       setValue(name, serarrr);
//     } else {
//       setValue(name, null);
//     }
//   }, [imageUrl]);

//   useEffect(() => {
//     return () => {
//       arrr = [];
//       serarrr = [];
//     };
//   }, []);

//   return (
//     <>
//       <Controller
//         name={name && name}
//         defaultValue={imageUrl}
//         control={control}
//         rules={rules}
//         render={({ onChange, value }) => (
//           <MultipleDropZone
//             {...props}
//             value={value}
//             onChange={(data: any) => {
//               onChange(data);
//               handleChange(data);
//             }}
//           />
//         )}
//       />
//       {errors && name && Object.keys(errors).length > 0 && errors[name] && (
//         <span className="block text-xs font-small text-red-500">{errors[name]?.message}</span>
//       )}
//       {/* <ErrorLabel {...ErrorLAbelProps} /> */}
//     </>
//   );
// };
// const WrappedImageDropZone = memo(MultipleDropZone);
// const WrappedReactImageDropZone = memo(MultipleReactDropZone);

// export {
//   WrappedImageDropZone as MultipleDropZone,
//   WrappedReactImageDropZone as MultipleReactDropZone
// };
export {};
