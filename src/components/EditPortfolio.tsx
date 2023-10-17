import { loadImage } from "methods/loadImage"
import { FormInput } from "./FormItem"
import { useState, useRef } from 'react'
import { addDatabase, editDatabase, upLoadStorage } from "utils/firebase"

interface editModal {
  edit?: boolean,
  close?: (boolean: boolean) => void,
  id?: string,
  defaultImage?: string,
  defaultTitle?: string,
  defaultLink?: string,
  defaultIntroduce?: string,
  defaultFeatures?: string[],
  defaultTechnology?: string[],
}

const EditPortfolio = (props: editModal) => {
  const { edit = false, close, id, defaultImage, defaultTitle, defaultLink, defaultIntroduce, defaultFeatures, defaultTechnology } = props
  const [imgRef, setImgRef] = useState(defaultImage || '')
  const file = useRef<File>()
  const [title, setTitle] = useState(defaultTitle || '')
  const [link, setLink] = useState(defaultLink || '')
  const [introduce, setIntroduce] = useState(defaultIntroduce || '')
  const [features, setFeatures] = useState('')
  const [featureList, setFeatureList] = useState<string[]>(defaultFeatures || [])
  const [technology, setTechnology] = useState('')
  const [technologyList, setTechnologyList] = useState<string[]>(defaultTechnology || [])

  const handleGetImageRef = async (files: FileList | null) => {
    if (files && files.length >= 1) {
      file.current = files[0]
      const src = await loadImage(files[0])
      setImgRef(src)
    }
  }
  const handleAddPortfolio = async () => {
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
        const id = await addDatabase(imageUrl, link, title, introduce, featureList, technologyList)
      }
    }
    catch (err) { console.log('error', err) }
  }
  const handleEdit = async () => {
    if (
      title.trim().length < 1 ||
      introduce.trim().length < 1 ||
      featureList.length < 1 ||
      technologyList.length < 1
    ) {
      alert('輸入不可空白')
      return
    }
    let imageUrl
    if (file.current) {
      imageUrl = await upLoadStorage(file.current)
    } else {
      imageUrl = defaultImage
    }
    if (id) {
      await editDatabase('portfolio', id,
        {
          imageUrl,
          link,
          title,
          introduce,
          features: featureList,
          technology: technologyList
        })
    }


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
            title='網址'
            value={link}
            placeholder='請輸入網址'
            onChange={(value) => setLink(value)}
          />
          <FormInput
            title='介紹'
            value={introduce}
            placeholder='商品簡介'
            onChange={(value) => setIntroduce(value)}
          />
          <div>
            <FormInput
              title='功能'
              value={features}
              placeholder='按 Enter 新增'
              onChange={(value) => setFeatures(value)}
              onEnter={() => {
                setFeatureList(prev => [features, ...prev])
                setFeatures('')
              }}
            />
            {featureList.length >= 1 &&
              <div className=" mt-2 min-h border">
                {
                  featureList.map(item =>
                    <div className="flex items-center">
                      <p className=" p-1">- {item}</p>
                      <span className=" ml-2 p-1 rounded-full font-bold text-red-400 cursor-pointer hover:bg-gray-300"
                        onClick={() => setFeatureList(featureList.filter(content => content !== item))}
                      >X</span>
                    </div>
                  )
                }
              </div>
            }

          </div>
          <div>
            <FormInput
              title='技術'
              value={technology}
              placeholder='按 Enter 新增'
              onChange={(value) => setTechnology(value)}
              onEnter={() => {
                setTechnologyList(prev => [technology, ...prev])
                setTechnology('')
              }}
            />
            {technologyList.length >= 1 &&
              <div className=" mt-2 min-h border">
                {
                  technologyList.map(item =>
                    <div className="flex items-center">
                      <p className=" p-1">- {item}</p>
                      <span className=" ml-2 p-1 rounded-full font-bold text-red-400 cursor-pointer hover:bg-gray-300"
                        onClick={() => setTechnologyList(technologyList.filter(content => content !== item))}
                      >X</span>
                    </div>
                  )
                }
              </div>
            }
          </div>
          {
            !edit ?
              <div>
                <button
                  className="form-button"
                  onClick={handleAddPortfolio}
                >新增</button>
              </div>
              :
              <div className=" flex gap-10 justify-center">
                <button
                  className=" py-2 px-4 bg-gray-200 hover:bg-gray-500 transition-inset"
                  onClick={handleEdit}
                >確定修改</button>
                <button
                  className=" py-2 px-4 bg-gray-200 hover:bg-gray-500 transition-inset"
                  onClick={() => close && close(false)}
                >取消修改</button>
              </div>
          }
        </div>
      </div>
    </div>
  )
}
export default EditPortfolio