import { niceBytes } from '@utils';
import { saveAs } from 'file-saver';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import * as Feather from 'react-feather';
import { Controller } from 'react-hook-form';
import { Label } from '.';
// import axios from 'axios';
import Spinner from '../spinner/clipLoader';

const STATIC_FILES_URL =
  process.env.END_POINT + '/tmp/' || 'http://api.metis.apps.actonatepanel.com/tmp/';
// const API_URL = process.env.END_POINT || 'http://api.metis.apps.actonatepanel.com/';
// const UPLOAD_URL = `${API_URL}/upload/file`;
const S3PATH = 'https://metis-act.s3-ap-southeast-1.amazonaws.com/media/';
// const query = gql`
//   mutation($src: String!) {
//     Users {
//       removeMedia(src: $src)
//     }
//   }
// `;

// styles
const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  // border: '1px solid #eaeaea',
  marginBottom: 4,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4
  // boxSizing: 'border-box'
};
const thumbInner = {
  display: 'flex',
  minWidth: 0,
  justifyContent: 'center',
  overflow: 'hidden'
};
const img = {
  // display: 'block',
  width: 'auto',
  height: '100%'
};

type ImageDropZoneProps = {
  label?: string;
  constraint?: string;
  displayOnly?: boolean;
  onUpload?: (res: any) => void;
  onError?: (err: any) => void;
  setValue?: any;
  value?: string;
  onRemove?: any;
  name?: string;
  preview?: boolean;
  labelClass?: string;
  className?: string;
  wrapperClass?: string;
  children?: any;
  onChange?: (data: any) => void;
  required?: boolean;
  path?: string;
  minSize?: number;
  maxSize?: number;
  accept?: string | string[];
};
const ImageDropZone: FC<ImageDropZoneProps> = (props) => {
  const [files, setFiles] = useState([]);
  const [errors, seterrors] = useState(false);
  const [fileSize, setfileSize] = useState(0);
  const [fileName, setfileName] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errMsg, seterrMsg] = useState('');
  const [serverFile] = useState(null);
  // const [removeImage] = useMutation(query);
  const accept = props.accept || '';
  const minSize = props.minSize || 0;
  const maxSize = props.maxSize || 10242880;
  const disabled = props.displayOnly || false;
  const constraint = props.constraint || 'PNG, JPG, GIF up to 10MB';
  const useDropZoneProps = { accept, minSize, maxSize, disabled, multiple: false, maxFiles: 1 };
  const { preview = true, required } = props;
  const onDrop = useCallback(async (acceptedFiles) => {
    setFiles(
      acceptedFiles.map((file: any) => Object.assign(file, { preview: URL.createObjectURL(file) }))
    );
    setfileSize(acceptedFiles && acceptedFiles[0]?.size);
    setfileName(acceptedFiles && acceptedFiles[0]?.name);
    setLoading(true);
    try {
      const res = await upload(acceptedFiles);
      // setserverFile(res);
      const respone = props.name ? { [props.name]: res } : res;
      if (props.onUpload) {
        props.onUpload(respone);
      }
      if (props.onChange) {
        props.onChange(res);
      }
      props.setValue(props.name, res);
    } catch (error) {
      seterrors(true);
      seterrMsg(error);
      setfileName(null);
      setFiles([]);
      props.setValue(props.name, null);
      if (props.onError) {
        props.onError(error);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const upload = (acceptedFiles: any) => {
    // return new Promise((resolve, reject) => {
    //   const req: any = axios.post(UPLOAD_URL);
    //   acceptedFiles.forEach((file: any) => {
    //     req.attach('file', file);
    //   });
    //   req.end((err, res) => {
    //     if (err) {
    //       console.log('Error', err);
    //       seterrors(true);
    //       setfileName(null);
    //       setFiles([]);
    //       reject(err);
    //     } else {
    //       seterrors(false);
    //       console.log('Response', res);
    //       const body = res?.body;
    //       if (body?.code === 'FILE_UPLOADED') {
    //         resolve(body?.file);
    //       } else {
    //         reject(body?.code);
    //       }
    //     }
    //   });
    // });
  };
  const { fileRejections, getRootProps, getInputProps } = useDropzone({
    onDrop,
    ...useDropZoneProps
  });

  const thumbs = files.map((file: any) => <Image key={file.name} imageUrl={file.preview} />);

  const remove = async (event: any) => {
    event?.preventDefault();
    if (serverFile) {
      // const variables = { src: serverFile };
      // const params = { variables };
      // const func = removeImage;
      // const successMsg = 'Image deleted Sucessfully';
      // const errorMsg = 'Image Cant be deleted';
      // const { res, err } = await handleAsync({ func, params, successMsg, errorMsg });
      // const data = res?.Users?.removeMedia;
      props.setValue(props.name, null);
      setfileName(null);
      setFiles([]);
    } else {
      setfileName(null);
      setFiles([]);
      props.setValue(props.name, null);
    }
    if (props.onRemove) {
      props.onRemove(null);
    }
  };
  const download = () => {
    const source = serverFile ? STATIC_FILES_URL + serverFile : S3PATH + props.path + props.value;
    const dest = fileName || props.value;
    saveAs(source, dest);
  };
  useEffect(
    () => () => {
      files.forEach((file: any) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  return (
    <section className={props.className || ''}>
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <Label
          className={props.labelClass || 'block  text-sm mb-2 font-medium leading-5 text-gray-500'}
          label={props.label || ''}
          required={required}
        />
        <div
          className={
            props.wrapperClass ||
            ' flex justify-center hover:border-blue-400 px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md'
          }
        >
          <div className="text-center">
            {loading ? (
              <Spinner />
            ) : props.value && files.length <= 0 ? (
              <Display fileName={`${S3PATH}${props.path}${props.value}`} display={true} />
            ) : files.length > 0 && fileName && preview ? (
              <Display thumbs={thumbs} fileName={fileName} />
            ) : errors ? (
              <Image errorImg={'/img/error.png'} imageUrl="" />
            ) : (
              props.children || <Icon constraint={constraint} />
            )}
          </div>
        </div>
      </div>
      {((fileName && !loading) || (props.value && !props.displayOnly)) && (
        <FileName
          serverFile={serverFile}
          fileName={fileName || props.value}
          fileSize={fileSize}
          value={props.value}
          path={props.path}
          download={download}
          remove={remove}
        />
      )}
      {errors && !(fileRejections.length > 0) && (
        <Message message={errMsg || 'Something Went Wrong, Check Network!'} />
      )}
      {fileRejections.length > 0 && <Message message="File type not accepted, sorry!" />}
    </section>
  );
};

const Display = (props: any) => {
  const { fileName, thumbs, display } = props;
  let image = '';
  if (fileName?.includes('pdf')) {
    image = '/img/pdf.png';
  } else if (fileName?.includes('doc')) {
    image = '/img/word.png';
  } else if (fileName?.includes('xlsx')) {
    image = '/img/xl-1.png';
  } else if (fileName?.includes('.txt')) {
    image = '/img/text.png';
  } else {
    image = display ? fileName : null;
  }

  return <>{image ? <Image imageUrl={image} /> : thumbs}</>;
};

const FileName = (props: any) => {
  const { serverFile, fileName, path, fileSize, remove } = props;
  return (
    <div className="mt-2 flex justify-between items-center">
      <span className="flex items-center">
        <Feather.Paperclip className="-mt-1" size="18" color="gray" />
        <span className="ml-6">
          <p className="text-gray-800 text-sm">{fileName}</p>
          {fileSize ? (
            <p className=" text-gray-600 text-xs">&nbsp;{'- ' + niceBytes(fileSize)}</p>
          ) : (
            ''
          )}
        </span>
      </span>
      <div className="flex space-x-1">
        <a
          href={`${serverFile ? STATIC_FILES_URL : S3PATH + path}${
            serverFile ? serverFile : fileName
          }`}
          target="_blank"
          rel="noopener noreferrer"
          download={`${serverFile ? STATIC_FILES_URL : S3PATH + path}${
            serverFile ? serverFile : fileName
          }`}
        >
          <Feather.Eye
            size="24"
            className="text-gray-600 cursor-pointer rounded-full p-1 hover:bg-gray-200 hover:text-gray-700"
          />
        </a>
        {/* <Feather.Download
          size="24"
          className="text-gray-600 cursor-pointer rounded-full p-1 hover:bg-gray-200 hover:text-gray-700"
          onClick={download}
        /> */}
        <Feather.Trash2
          size="24"
          className="text-gray-600 cursor-pointer rounded-full p-1 hover:bg-gray-200 hover:text-gray-700"
          color="gray"
          onClick={remove}
        />
      </div>
    </div>
  );
};
type ImageProps = {
  imageUrl: string;
  errorImg?: string;
};
const Image = ({ imageUrl, errorImg = '' }: ImageProps) => {
  const image = errorImg ? errorImg : imageUrl || '/img/sucess.png';
  return (
    <div style={thumb}>
      <div style={thumbInner}>
        <img src={image} style={img} />
      </div>
    </div>
  );
};
const Message = ({ message }: { message: string }) => {
  return (
    <div className="mt-2 flex justify-between items-center">
      <span className="text-red-400 leading-4 text-sm font-sm">{message}</span>
      <span />
    </div>
  );
};
const Icon = ({ constraint }: { constraint: string }) => {
  return (
    <>
      <div className="flex justify-center">
        <Feather.UploadCloud color="#4299E1" />
      </div>
      {/* <GalleryPicSvg /> */}
      <p className="mt-1 text-sm text-gray-600 ">
        <span className="cursor-pointer font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition duration-150 ease-in-out">
          Upload a file
        </span>
        <span className="ml-1">or drag and drop</span>
      </p>
      <p className="mt-1 text-xs text-gray-500">{constraint}</p>
    </>
  );
};
type ReactDropZoneProps = {
  label?: string | undefined;
  displayOnly?: boolean;
  constraint?: string;
  onUpload?: (res: any) => void;
  onError?: (err: any) => void;
  className?: string;
  imageUrl?: string;
  required?: boolean;
  labelClass?: string;
  name: string;
  children?: any;
  errors?: any;
  clearErrors?: any;
  onRemove?: any;
  onChange?: (data: any) => void;
  setValue: any;
  wrapperClass?: string;
  path?: string;
  rules?: any;
  minSize?: number;
  maxSize?: number;
  preview?: boolean;
  errorClass?: string;
  accept?: string | string[];
  control: any;
};
const ReactDropZone: FC<ReactDropZoneProps> = (props) => {
  const [state, setstate] = useState(true);
  const { control, errors, setValue, imageUrl, name, onChange, rules } = props;
  // const ErrorLAbelProps = { errors, name };
  const handleChange = (data: any) => {
    setValue(name, data, { shouldDirty: true });
    if (onChange) {
      onChange(data);
    }
    if (props.clearErrors) {
      props.clearErrors(name);
    }
  };

  useEffect(() => {
    if (imageUrl && state) {
      setstate(false);
      setValue(name, imageUrl);
    }
  }, [imageUrl]);

  return (
    <>
      <Controller
        name={name && name}
        defaultValue={imageUrl}
        control={control}
        rules={rules}
        render={({ onChange: on, value }) => (
          <ImageDropZone
            {...props}
            value={value}
            onChange={(data: any) => {
              on(data);
              handleChange(data);
            }}
          />
        )}
      />
      {errors && name && Object.keys(errors).length > 0 && errors[name] && (
        <span className={props.errorClass || 'block text-xs font-small text-red-500'}>
          {errors[name]?.message}
        </span>
      )}
      {/* <ErrorLabel {...ErrorLAbelProps} /> */}
    </>
  );
};
const WrappedImageDropZone = ImageDropZone;
export { WrappedImageDropZone as ImageDropZone, ReactDropZone };
