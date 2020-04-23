/**
 * @author snack.huang
 * @param fieldName 文件名称
 * @description 对应文件类型的图标地址
 */
const filedTypeFilter  = (fieldName) => {
    const baseUrl = 'resources/images/file/';
        let type = '';
         if(/.jpg|.png|.PNG/.test(fieldName)){
                type = 'image.png';
            }

            if(/.xlsx|.xls/.test(fieldName)){
                type = 'excel.png';
            }

            if(/.docx/.test(fieldName)){
                type = 'word.png';
            }

            if(/.txt/.test(fieldName)){
                type = 'txt.png';
            }

            if(!type){
                type = 'word.png';
            }
          return baseUrl+type;
}

export default filedTypeFilter