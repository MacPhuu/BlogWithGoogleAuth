import { articleActions } from '@/actions/article'
import { ROUTER } from '@/configs/router'
import { IArticle } from '@/types/models/IArticle'
import { trimStringToArray } from '@/utils/helper'
import { FormEvent, useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const EditorForm = () => {
  const { slug } = useParams()
  const navigate = useNavigate()

  const [currentArticle, setCurrentArticle] = useState<IArticle>()
  const [isLoadingEdit, setIsLoadingEdit] = useState<boolean>(false)

  const titleRef = useRef<HTMLInputElement>(null)
  const descriptionRef = useRef<HTMLInputElement>(null)
  const bodyRef = useRef<HTMLTextAreaElement>(null)
  const tagsRef = useRef<HTMLInputElement>(null)

  const navigateToArticleDetail = (article: IArticle) => {
    navigate(`${ROUTER.ARTICLE_BASE}/${article.slug}`)
  }

  const createNewArticle = (title: string, description: string, body: string, tagList: string[]) => {
    const article = { body, description, title, tagList }
    articleActions.createArticle(
      { article },
      { onSuccess: navigateToArticleDetail, onFinally: () => setIsLoadingEdit(false) }
    )
  }

  const updateArticle = (title: string, description: string, body: string) => {
    if (!slug) return
    const article = { body, description, title }
    articleActions.updateArticle(
      slug,
      { article },
      { onSuccess: navigateToArticleDetail, onFinally: () => setIsLoadingEdit(false) }
    )
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoadingEdit(true)

    const title = titleRef.current?.value || ''
    const description = descriptionRef.current?.value || ''
    const body = bodyRef.current?.value || ''
    const tags = tagsRef.current?.value || ''
    const tagList = trimStringToArray(tags)

    if (!slug) {
      createNewArticle(title, description, body, tagList)
      return
    }
    updateArticle(title, description, body)
  }

  useEffect(() => {
    if (!slug) return
    articleActions.getArticle(slug, {
      onSuccess: setCurrentArticle,
    })
  }, [])

  const { title, description, body, tagList } = currentArticle || {}

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <fieldset className="form-group">
          <input
            disabled={isLoadingEdit}
            ref={titleRef}
            defaultValue={title}
            type="text"
            className="form-control form-control-lg"
            placeholder="Article Title"
          />
        </fieldset>
        <fieldset className="form-group">
          <input
            disabled={isLoadingEdit}
            defaultValue={description}
            ref={descriptionRef}
            type="text"
            className="form-control"
            placeholder="What's this article about?"
          />
        </fieldset>
        <fieldset className="form-group">
          <textarea
            disabled={isLoadingEdit}
            defaultValue={body}
            ref={bodyRef}
            className="form-control"
            rows={8}
            placeholder="Write your article (in markdown)"
          ></textarea>
        </fieldset>
        <fieldset className="form-group">
          <input
            disabled={isLoadingEdit}
            defaultValue={tagList?.join(', ')}
            ref={tagsRef}
            type="text"
            className="form-control"
            placeholder="Enter tags"
          />
          <div className="tag-list"></div>
        </fieldset>
        <button disabled={isLoadingEdit} className="btn btn-lg pull-xs-right btn-primary" type="submit">
          Publish Article
        </button>
      </fieldset>
    </form>
  )
}

export default EditorForm
