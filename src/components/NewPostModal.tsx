import { PlusOutlined } from "@ant-design/icons";
import {
  App,
  Button,
  Flex,
  Form,
  GetProp,
  Image,
  Input,
  Modal,
  ModalProps,
  Steps,
  Upload,
  UploadProps,
} from "antd";
import ImgCrop from "antd-img-crop";
import { RcFile, UploadFile } from "antd/es/upload";
import { useState } from "react";
import { API_POST_URL } from "../data/reference";
import APIHelper from "../helper/APIHelper";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

interface IPostFormData {
  text: string;
}

interface NewPostModalProps extends ModalProps {
  onPost: () => void;
}

const NewPostModal: React.FunctionComponent<NewPostModalProps> = (props) => {
  const { message } = App.useApp();

  const [currentStep, setCurrentStep] = useState<number>(0);

  // step 1
  const [selectedFiles, setSelectedFiles] = useState<UploadFile[]>([]);
  const [isPreviewOpen, setIsPreviewOpen] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState<string>("");

  // step 2
  const [form] = Form.useForm();

  const [isPosting, setIsPosting] = useState<boolean>(false);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setIsPreviewOpen(true);
  };

  const onFinish = (values: IPostFormData) => {
    console.log(values);
  };

  return (
    <Modal
      title="發布貼文"
      okButtonProps={{ style: { display: "none" } }}
      cancelButtonProps={{ style: { display: "none" } }}
      {...props}
    >
      <Flex vertical gap={16}>
        <Steps
          current={currentStep}
          items={[
            {
              title: "選擇圖片",
            },
            {
              title: "撰寫內容",
            },
          ]}
          onChange={setCurrentStep}
        />

        {currentStep === 0 && (
          <>
            <ImgCrop
              modalTitle="編輯"
              showReset
              resetText="重置"
              showGrid
              rotationSlider
              onModalOk={(e) => {
                console.log(e);
              }}
            >
              <Upload
                type="select"
                accept="image/*"
                listType="picture-card"
                maxCount={10}
                fileList={selectedFiles}
                onPreview={handlePreview}
                onRemove={(file) => {
                  setSelectedFiles((prev) =>
                    prev.filter((f) => f.uid !== file.uid)
                  );
                }}
                beforeUpload={(file: RcFile) => {
                  setSelectedFiles((prev: UploadFile[]) => [
                    ...prev,
                    {
                      uid: file.uid,
                      name: file.name,
                      lastModifiedDate: file.lastModifiedDate,
                      lastModified: file.lastModified,
                      status: "done",
                      url: URL.createObjectURL(file),
                      percent: 100,
                      thumbUrl: URL.createObjectURL(file),
                      originFileObj: file,
                    },
                  ]);
                  return true;
                }}
              >
                {selectedFiles.length >= 10 ? null : (
                  <Flex vertical gap={8} align="center">
                    <PlusOutlined />
                    上傳
                  </Flex>
                )}
              </Upload>
            </ImgCrop>
            {previewImage && (
              <Image
                wrapperStyle={{ display: "none" }}
                preview={{
                  visible: isPreviewOpen,
                  onVisibleChange: (visible) => {
                    setIsPreviewOpen(visible);
                    if (!visible) setPreviewImage("");
                  },
                }}
                src={previewImage}
              />
            )}
          </>
        )}
        {currentStep === 1 && (
          <Form
            form={form}
            onFinish={onFinish}
            initialValues={{
              text: "",
            }}
          >
            <Form.Item name="text">
              <Input.TextArea rows={5} placeholder="分享你的心情" />
            </Form.Item>
          </Form>
        )}

        <Button
          style={{ alignSelf: "end" }}
          onClick={async (
            e: React.MouseEvent<HTMLButtonElement, MouseEvent>
          ) => {
            if (currentStep >= 1) {
              setIsPosting(true);
              await APIHelper.post(API_POST_URL, {
                text: form.getFieldValue("text"),
              })
                .then(() => {
                  message.success("發布成功");
                  props.onCancel?.(e);
                  props.onPost?.();
                  setCurrentStep(0);
                  setSelectedFiles([]);
                  form.resetFields();
                })
                .catch(() => {
                  message.error("發布失敗");
                });
              setIsPosting(false);
            } else {
              setCurrentStep((prev) => prev + 1);
            }
          }}
          type={currentStep >= 1 ? "primary" : "default"}
          loading={isPosting}
        >
          {currentStep >= 1 ? "完成" : "下一步"}
        </Button>
      </Flex>
    </Modal>
  );
};

export default NewPostModal;
