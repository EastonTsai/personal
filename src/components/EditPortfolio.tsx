import { loadImage } from "methods/loadImage"
import { FormInput } from "./FormItem"
import { useState, useRef } from 'react'
import { addDatabase, upLoadStorage } from "utils/firebase"

const EditPortfolio = () => {
  const [imgRef, setImgRef] = useState('')
  const file = useRef<File>()
  const [title, setTitle] = useState('')
  const [introduce, setIntroduce] = useState('')
  const [features, setFeatures] = useState('')
  const [technology, setTechnology] = useState('')

  const handleGetImageRef = async (files: FileList | null) => {
    if (files && files.length >= 1) {
      file.current = files[0]
      const src = await loadImage(files[0])
      setImgRef(src)
    }
  }
  const handleAddPortfolio = async () => {
    const featureList = features.split(' ')
    const technologyList = technology.split(' ')
    if (
      !file.current ||
      title.trim().length < 1 ||
      introduce.trim().length < 1 ||
      featureList.length < 1 ||
      technologyList.length < 1
    ) {
      alert('輸入錯誤')
      return
    }
    try {
      const imageUrl = await upLoadStorage(file.current)
      if (imageUrl) {
        const id = await addDatabase(imageUrl, title, introduce, featureList, technologyList)
        console.log('id', id)
      }
    }
    catch (err) { console.log('error', err) }
  }

  return (
    <div className=" flex-none w-full">
      <div className="  wrap-90 max-w-[720px] py-8">
        <div className=" flex flex-col gap-y-6">
          <div className=" flex gap-2 ">
            <div>

              <label htmlFor='inputPortfolioImg'>快照 :</label>
              <input
                type="file"
                accept=".jpg,.png"
                id='inputPortfolioImg'
                className=" hidden"
                onChange={(e) => handleGetImageRef(e.target.files)}
              />
            </div>
            <div className=" w-36 h-36 border flex justify-center items-center">
              <img
                src={imgRef}
                alt={imgRef}
                className=" max-h-full max-w-full"
              />
            </div>
            <label
              htmlFor="inputPortfolioImg"
              className=" self-start px-4 py-2 bg-gray-100 hover:bg-gray-300 cursor-pointer transition ease-in"
            >選擇圖片</label>
          </div>
          <FormInput
            title='名稱'
            value={title}
            placeholder='請輸入名稱'
            onChange={(value) => setTitle(value)}
          />
          <FormInput
            title='介紹'
            value={introduce}
            placeholder='商品簡介'
            onChange={(value) => setIntroduce(value)}
          />
          <FormInput
            title='功能'
            value={features}
            placeholder='相關功能 (使用 "空格" 分隔)'
            onChange={(value) => setFeatures(value)}
          />
          <FormInput
            title='技術'
            value={technology}
            placeholder='相關技術 (使用 "空格" 分隔)'
            onChange={(value) => setTechnology(value)}
          />
          <div>
            <button
              className="form-button"
              onClick={handleAddPortfolio}
            >新增</button>
          </div>
        </div>
      </div>
    </div>
  )
}
export default EditPortfolio