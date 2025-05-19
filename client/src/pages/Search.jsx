import React, { useEffect } from "react";
import RootLayout from "../layout/RootLayout";
import AOS from "aos";
import Product_item from "../components/Product_item";

const Search = () => {
  const products = [
    {
      id: 1,
      name: "Móc treo rèm phòng tắm RING",
      price: 20300,
      originalPrice: 29000,
      discount: 30,
      image:
        "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAMAAzAMBEQACEQEDEQH/xAAcAAACAgMBAQAAAAAAAAAAAAAABAUHAQMGAgj/xABEEAABAwIEAgYIBAQEBAcAAAABAAIDBBEFEiExBkEHExQiUWEyQlJxgZGhsRUjM8FiktHhJDRDchZTgvEIJTWDk7Lw/8QAGgEBAAMBAQEAAAAAAAAAAAAAAAIDBAEFBv/EADURAAIBAwIEAgoCAgEFAAAAAAABAgMEERIhEzFBUSJhBRQycYGRobHB8CPRQuGCJDNSYvH/2gAMAwEAAhEDEQA/ALxQAgBACAEAIAQAgBAa5JGxMc+Rwa1rSSSbAAc0CWdim+kPpAxGaUwcP1UlLSxHWZujpuW+4C7zRthQdKSc+fb6HCUnSFxVQlzI8erCCb/mFs31eCVxpvkV5pKT1r5ElT9LXGAu0VtNKBzkpRf6ELvIg4KUnoG29K/FU7yyappohYAdRT2P1JXGn0LrenTUsVAf0icSMlL/AMWlEeVxs5sZ5/7V1botk6FKfigmn5v+yyej/j2LHj+HYk9seIt0YRo2YeI8/JMYMk6Tw5R5HeDZcKTKAEAIAQAgBACAEAIAQAgBACAEAIAQAgNFTUQ0sLpqiVscTbkve6wCHYpyeIlUcb8bHGnfhmD5xRNkHXznTrreqP4efmbct5LGMs2W1CpGtF45HJVtAypid1jiSQRppryVcZYR9BdWEZYk3vy/o4SuoXU1Q6OQnxBvuF3WfP1rVQljPma4GNaXEP8AmuSkSoUYpvc9juzE5wNd7eSatjvC8ecjHVduniiiebWJe8DYDdIyJ1aCrSWlkmx09EztETyyRjw+OVpsWuGx+dvkmrVJIulQnRt5N9S6OCuk2ixnqqPFstFXOADXlwySu8jyPkpZ3webK3kqaqLqWG03aDca+CFBlACAEAIAQAgBACAEAIAQAgBAYJA3KAw97WNLnEADck7IMHHcRcd0OHZ48OZ2+oG+R35bT5nn7h8wuakelQ9FV6kdclhfX5Fa4xxHiONz5a6bNqcrW6RtHkPFVyye3aUoUv46cd317/n8HPyNdRSOETiWv1u42AP/AO+ylB6jJdUpWssw3z3H4nz1NHY5rubvfKB+6bRkbI8W6tsd17v9kbV4UKyMm4bILkNA1HiNVycsboy0rPiQ0t+ey5EUcBY7UYjCx59R5Fx9VBVJdjPOxin7T+X+wfgNQ6TKyohyixL78vgik+pN2UqiWiS+xkxNgPZqIudHfvS+s7xv5BTTWMkJwcZ8Oluu/f8A+HqasL2iDWzdSW6fNIxx4iVa5Uv4l0/dxRkEz5i9hBbe5a5dcsIohbTlJ6Wd7wp0h4xgDm01Revom6dRK+z2D+F37G/wXUyutaZeMYZc3DfEmGcQ0gmw6e7wPzIZBlkjPg5v77eCkmnyMFWjUpPE0TNx4oVmUAIAQAgBACAEAIAQAgBAJ4rXQ4bh9TW1F+qgjL3Abm3IeZ2QlGLnJRXUoviTi3FsTeRiFRljLiBS07rNv5nmPPnZSW62NzpK1lmot+xCwYlPURknK0NdawGqqnBJnrWd/UrU3lYwxF08jas99wtIR8CFNpaTDGtUVxjP+TXzRpxSV7mxPa4mx0NzouUx6Sk8RY9h2M9awRloz8xyuuTh1NVl6Sz4GtzTWVVS2WzXlt9WgePMKUUmjPdXFaFTVF4yQuJ1kF29XZ8osT/CfBQx5FNxcRlhrn9j3PNM6zI3Oaw6tbtrz+CkkuZCpWm3pib4ans8Jz3JPrDxVbhqZtjc8CHi5ik95S52ozHVx53Ksj2MVbk5Y3YzRQ2YTc6uIXJ4zgvtY5i3nr9hZ0jm1BcHkOvpZWJLB5sq01Uc09yWwvFayKojlp53wVLD3Z49HHyKjoUd0bY3crmPCqc/v+9y8ujDiybiHDpqXEzbE6N9pNLdZGfRdb6H3DxRGKtRlSe6wdyhSCAEAIAQAgBACAEAIDBNhcoCu+l/Hex4dFh8RBfIDNI2/qt2+tvkuSWx6Ho/wzdR9CmYan8QpC5gv1ZtY7+X2XYeElcVPWoa48zFCJ4amSGRhAzXBK5VaNHo6lUjqi0esQpJRUOJLReRpFj5FcUlpJV7Wart+af0CekdLTt7zdDZcp1Nyd5audNZfUWiozA5sjX94Ova26scsnnwtXBqSe6M1TnVEZbFdozbndUuWlm90+PDzNEGDf8Alj6l8jC5pt1Y9InYDf8AZaI4ayeRVoTjLHcj6UvgqHh/ol1nA7g+IVTLaClCeWh6SldPI0E2au5wjROi6sllkjWYW2Cn0eR3m/dVRm8noXVjGNPn1Qzh+HB0VzJ6x5JKfiLrOzXD9ruRtZRZJzleLa2JC0KZ4lSyabwzVTN7PODK4Bg1zclGcsx2O21J0q6dTkdHwxj8mCcTYXiQJ6p7WsqBuXMOh/Y/BRprwl/pCUqkk1yayfSbHte1rmm4cLg+IUjyD0gBACAEAIAQAgBACA8v22Q4yiOOMVjxWrxeqz5omflR+Fh/W1/iuSTPo7TgxtZeS+rOD4YJj6x4LrdZrpodFJLKPJoSdKWtcs/AbrZnmrByNAyearqQWDfQuJym9lyND6ySWWzrWGXkUilp+ZKtcTdXby6fAdrnyCnAYCLOGzVGmo5NV9KqqO3fsISvqMv+p8gr9jxnKu+bZppmTGN+r7g+SpnjJttFW0vd/Q2xueaazjIL6DujU3+imksGSc68eXn2NEETpq8hzHEhoJtYXUtiv+WUuo6+nma8Wa8a+2jxgtVOtnr8xnExUGmd+poRzvzVEGsns3kavC5vp9xnCxUdnNus9I+C7LGolZcbhvd82RlSKlsznHrOe4BVyUTxanrEZN7/AEI+cySsNwBb0nf2UXhPYLXUTztgkpZYnYDSPtqAQRz3UIJ6mjdcVYK0py6l99FGOfjvB1LI9+aelJpprnW7dife2x+KsPBm05No7JCIIAQAgBACAEAIAQEFxtiRwrhmtqY3ZZjGYoTzD3d0H4Xv8F1bs7GOqSRQGMAR8PSttcvOlj8B9E67nsVHixz/AOT+nQheDahjaienkNs4u24vqoPKHomUHUcJ9eRMVdREZwGa2aeS5Ui8F1tcUnUcV2IqWpY2cgX5a281yMXg5cXUI1Nuy+jHK+sY6Aksdv4qMINMvvbuPC+JGOrri2VX6Dx3eZ6GylqyY5Bk9bxVVSmb7O78Mtupvw1zasvhJZGQ8uzHUkc7clZGGUZKl247Y6sWo8QHb5n5Lgts3XwJXdG5XC7aerA3JWv7p6sePpLvD2J+vtv2TfXVhdTPvHvY6O8ws8YYZ691d4ot6e33GcNrbQOAZ659b+y7OG5ZZXb0PbqxCetBe+8RuCRurlDY8ereriNOPUi6ufNC8sbZx+ig4+I7x1KlLSt2bqEGbAh7THu3Pmup+I4lrs8vod90DYy6j4mqsJldaGvhzsHLrY/D3tLv5Qps83Bfd1E4ZQAgBACAEAIAQGCbBAV50rV7CKPDi5m5mc0+6zfunI9Kwpwacp/D997Kz4ihi/DgwMGnsrmdz2vSNClwY00cFhEvZcRY4ajOQnNnzttLRUydHe9SRcWDP6KdTkWej2uM/cRdY5vaDl8B/wDZQjyO3T/l/e5urLmC3u5LkOZfeZ4LETfLdXHk7m+jBySb+OyrqHoWaemXvCIDK8PJFnG9238FKL2M9aL1NY6sIv8AOGzdAw3I2OqkmUOL7DWQloNj8FIKL/Ub65pEDgQbZRyWZcz3bmOaD93Y24bYxu33uu1BZZ0y94lUA9fILesVdF7Hj3KxWkvMjqgFuZlrG6hMnQezRJ8NxsfhtQJT3hLYDysP7qicscj2PR1OMqElLubcFxYYNj9BXxDMaaZrzba17HX3Eq3zPNqTgk4n1VTytnhjljdmZI0OafEEXC6YDagBACAEAIAQAgPLtvigKU4wm/FOJaqcPJbG7q2i19G/3XNSPo7Oyfgeez/fmjkuJIiQGtyGzfGxSLWDnpSjPMVF8jh9RUtae67ON/euHjYxs9jsw+nNRLrHo232XKmcHs2Touo0muRFVBhE5tk2H3UY5wV3DpcXp+scq3wdn3buOSjDOo1Xc6XBfwI/rYb2BGm3dKuwzyeNRGaKeLK8a309VVVIs3WNaDUlj6GYXddWTQRRl0rjdrSQ25tsL7nyVkItoz3FxTjUkmn+pGo1LafEXwynUMLXFoJs7Q225c/NSaZTG4hqy/sSXaohHaz7geyU0sv9appbZ+Rurp2Oo3OLX3yeys6i9R69etF0G9+XY8YVUsAcLO5er5KU0yuyrQepe7p5GmeqhbVSXzb+wfBTinpMV1cU415f0Q+NTQ9ayWM3zCxFua7KLMU68NWYmOHS95mj2BsdfFRlhIv9H6pSlFe8zWQNZK4E5hfUE6KSllFNahGE3k+i+ijFxi3BtHmeXS016d9zr3dr+8WUjBVilLY7FCsEAIAQAgBACARxysFBg9ZVuNuphc4e+2n1Qtow11IxZ8+01RI6R8j3nX77rs8LY9uwq1Zzc89PvuQuM18pqXMNiBpqihsY7u9qOtLJzbR1uLU7bWzStH1UWsMxJ8Sa6HWR0obM/M8m4O7Qo1JeE9iztdNV5ZG1NMBOCXO1bfYciownsLm3xPOen5HaimBpScz+XNQhLxGu5t07d7sjmU936mT+YrRlnjcBdW/mMQRR3e0h2w5qqtJm6zowUpJZ+YCGEVD5b2dYEWdYtNt1KnKWCu5oU9cm/v5C08EXaontOrgS85rlx8/qpb5Mrowysfcl209O6K9ht4qWZF/q9Fx3+43PTwGiI0/TPPyWfMtR7c6NN2+MdO/kK4bAwPcLnYbO8l2cnkz2VGCcseXU1VsDBUOsXb+0VZCT0mO8oQdZ8/n5EVj0DewZm59CBq667lmC4oRhDKz8xbCZ+oqW5Re4tc+ai45RK3r8Grt7vmGKFxqyXHcAqceRTfZdZ56lo/8Ah9xbqcUr8Jkd3amIVEQJ9Ztg76FvyKkzGXmogEAIAQAgBAYOyA47pTqXxcLupoj36qVse/qjU/YJnBrs6Mqrlp5pffb8lRQ0744jYA3JP7BQlJNnvW1rOFNtrv8ATY5DEHSOq3Eg2Lirs7HzdWM3NtrmR7btxGAsuCJBrzXGVpuO6OkbNMZe9LJsfWKVUtJvsq9R1l4nyfUjquR/Wtu93ou9ZQglgsu6s9XN8mO1Je2iN3u9HxUIJakarhyVu9yJhvmOp+a04PCy2e4Td8nuVdRGuz5yBrc8zraZnC3yCJ4QnT4tZx7v8BWU5ifG5xuHDTTZdjLUQuLbg6fMbh/TCsMxIkXof/bI+izv2j6CL1Wnw/AlT2D3/wC0Ls+hls9m/chauP57vh9lOnyMd4/53+9BOu/ypHK+3xXZcjMm9jFK3NK0jm0gfdQiaprdPy+26GsQp3vlie7uh7baqMZLdGm6oObjUe2UTXBNWMD4kwzEQ8/kVIEp5dW7uvv/ANLifgpaslCtVjnufUbffdDEZQAgBACAEBh2oQFV9MGIubW0NHG4WjjdI7uk6n3e4JzPRs5ypQ1L7Z5J/lnB1lW6moy5wYS1gG9tVXjMj3pXDo2zbSyl5nISVIdLmOYXVjR8/wAddUDmCeogcwtzB4H1XMtM5OnGqvAibkop2yg9zY812rNaTRZ2dWNXcRfRSvnscujLqEJLBO4tJyn8B2tpXdmPfb6Pmoqa1I23NtJ0HuRsdGbG8jfkr9Z4qs5PqFPSDPJ3jtyH91VVmbbO03ll/Q201KztGrnHvfsoub0ltO1hxt31/A1i9FHkpyC4aFKU3gt9JWkMRweaeiYY/wBRwV2s82Nin/kScdEOzMtKfR5tVDn4j3KNovVks9BGnotT+Z6g9XzUqk9jLaWmJ8+iI+upLTOHW8vZ/up057GG7tP5Hv0/eotiNL1dJnD83llUnPJlqWuhasjOHdVHUNNrWbe3yVKy2epDhQSl8TXicrnNYGg2a6ws3VdjFKWWU3VSU6UdPQ8RRSvuNrjm5W6kjEqVWXf5/g+n+B8SOLcLYbVudeQwhkmvrN0P2v8AFcM04OEnFk8hAEAIAQAgMO2QFGcdYpHWcW1bdSGPEQI2sP8AsuOOVk920rU4RjSfPb67/g5bHa2F0Lo87bk7EKqKecm/0jc0nT055s5icROuWkb8la8nhOFN8jZS2YYn373Wt9IeajnMkicKahTcupPvqZHzkEx6NOwcu1IrBqs7mUquHj6/0KySv6wkEaxnZp8VGEVgnc1pKX/Hs+5vrZJuzP32HqKMUtRpuqlR0H/RFRumttJ/KFoxE8PXW8/kj1TmfPJ+oe74gKqoomyz4zlLmZgjldWeeY7vXG1pJwp1HX379/IexGGbqoiNbZtn+5KTWC30hTqYjj7/ANmilFTbZ/8A8g/ortjzUq/n80S0DarsrdH7e2P6KiWNSPftVW4C5/NCVM2pvtJ6A9YHmpT04Mdmq6fXkvuR2IdoFQbh50HMLtPTgy3vG4vXoK1z5TSOD8+3kpvGDHN1dO+TbgMPXVWSQ+obBvuVcnh5N9jS4qcJdmMVEseZsbASdw3f6qCi3MvlOmqehb5Fe1kSt7oBvzWhRPJldyzsi7egfFTVYRiFA8jNTz52gey4b/MFcawZ5zc3llorhAEAIAQAgFsQqWUlDPUPdlbFGXE+Fgh2Ky0j5qmqxPjL3vPffnm12cSeS63sevRh/wBSs+b+y+xA4k8uks7calcgjLfzbmkRc2nipMxZNlJOYquna42Z1jb+O6rSNcKzglvsdn2uF0zg0n0d7Lk4ySPYs7qjKp4X0FZ6qNntfp+HmuU4vB26uacZf8fyeausaad4DXegoRg9RZc3ceC+ZGR1QA9BaNB4ju12MU9WC+SzOSrqwNVndeJ7HmCqcKy4aPSKOC0incy4/LqyQq6x/UtBa06n9kpQ2Lb+7klHKF6euLBrGN/FW6DBG+cehMwVpfSttFyPrKicPEe/aXmqhHYTpKy7rdXr1fj5rs4bGOzvE5Yx0/JG4lV/4k9w7eK7CGxmvrv+XkJ1NXnpnjKp6DFO61RxgMCnd+JstoCwj6KM0sF1jVk6xvhJ/Emxn2iF2XLKJ2+VU0vp/s0VLCKoNGlngE20A5lTTyjDVhpqNFjdCeIspOMZKdrTHDXU7mNLtnPYcwaPOxcfgjI1NOfCsF+jyUSsygBACAwdkBVvTbiLQzCsLe49XK908oBtYDut+FyT8FKK2OqOoqTEhTMxRraOZ00LSMj3Cx21+CjVfhN9gs1fE+QrVdTLK6wsb8iowbwW3VOnOo2JVFO0nuu+alqMvqyfJnc9G/B34gMTx6tjDqShppWwB2z5sh1/6R9SuQedyFzHRJRZA0us2tvQ2VlXkX+jVms/cLYg4CUWOnVn7qEORdftcT4P7nuYZoHkWtkUY+0XXG9BvyI1qvPEMU36j7eAVVQ2WftM9Qtd2r0T6Xh5LmfCXQjLj8uv4H6yN/Vt7p+SUmsEvSEJ4jsJsBBAsfkrjzNMuxM0YIpI9DzGyon7R9BY54EdhGkuJNj6J+6lLdGGzTU+XT8iOIj/ABGx28PNdg9im+T4vIkuCsFj4ixyPCZQbTQSlvKzwLtK62YtyJwelmixns8jcskRex4PIjQqubwjf6Ng5V0l5koyCOnx2AykEOksSdtR/VVuWY7HpQoRo3kXLq/wa8SfE+smDR3WDMMu17qdMovqkOJJJG/DsercJigjooWAxVEdS11iHuLTcMPkdj5FWnkSpuL04PqbD6uKvoqespnZoaiJsjD4tcLj7qJBrAwgBACA1VUogppZnGwYwuPwQlGOqSR874nC2vqJKmSaYnUtLjsL3tr711TaPYq2NKo9Uc4IQUNNNSdZK50UgJyyEfqX208LLknlnKFKlClltrHXu32IOtoZ6SdweQ4DXMw6LikmZa9rVpzeoWpxJJUgNdYbkE8kbWCFGEpVMZ5F9dHNLWUfRliclaxzIqgTSwMe2zshba/uK5FYRytKNSvuV1BT0zZSQ1t8p9byXKjlg9q0t6EauUl8yNrGQmbXJ6DlCm3gjeQpa1y5MdcabsjzaP0PDyUVnUa6joq3fLkRfWwgHvN+S0bnh8SiuxqpZo+udpfQbNVVRM1WdWCkzDZwK3Rp9LlpyXND0k1XXrGy6/glJalpa0FjxcH9kpReC+9uIpRyn+4EmVDM5vn+IV2lnmqvDqmTVNUx9jYe9oT6qpknk920rQ4C/oSpKiMv57H1PNdkngx2teGr4Pp5iGJzs7RezrW9hdpxeCi+rU+L/o6foee2XjyjbrdsMrtW+QViyeZWqQcMI99KmFNwnpDnqKENtVU7aiRh9Vzi4G3jfJf4qEknsWWUqkZKcen5ORkhnra6nlBs4G4v4DyXEtKeTZUcrirBx5vf5DD42xydqvle8lry7VzfC3gu+SJTitSrz25p9Ra3UvkZ1bw0m4JOpXU8lDXCbSWy+pd3Qljpr8CnwuW+ehf+Xf8A5btQPgbqbWDzaklKWpFkrhWCAEBB8aVHUcMV7r2LoiwHwJ0Quts8VYPn2udURUsrjns2+0gI28LKeYmuVOus88e8Vw6QNooWOImghZcg73VL+p6FKS0pPxQgs/ERlJOkbxmldmc1/IIzPhteGW83lp9haTIWZpY8rbnVvsj+q5syEpZ3lHH7+T6IpG1VL0Sx/icrn1Awu73PGou24B9wIHwViPMazNpFLU9NnMZa9hu0/wCnZcqT2PasrVqonlfIWq6UiQDOP03+oFCnMtvLd6lv0l0Q8ab/AAjx1jh+WToB4KCn4jbK3zbtN9CJfTtA9OT5q/UeF6su7NVNAzriSXG49pVVJPBqtKEdbz2PPVwCvF7elzN+S5l6SbpUlcb45/gk3RwO6sd3Y/slJyL7ylRlpX70FuyxZiQdv4irtTPN9WpJ/wCyVpYIuxt0O59Yqmbeo9y0oQ4CwJ0cEXWHfY+sfH3rs5PBktKFPV8H18xLE4Y+uIAO3tH+q7Tkyi+o0+J/tnXdC8DP+O4nt3bSy8/FTTZ5denCMfCTvTZQTRcQYdiUbGubPSmG7hoHRuLrfESH+VclhF1g23KKSb5rJwDy9zA1k0cZA6yMRt1PiFzbm0elOT9nUl1jj6owGguGSI5Zh6b/AGkecb9BCKcvBHaa5vuRtY9r4opHS9a6Jwa621ros525GOs04KU3mS2ZZHQoysbxBPJSRZqIwls726NHs68zvorN+plr8NQ0rmXe3muGM9IAQC2I0MGIUclLVMzwyCzheyEoTlCSlHmiqcV6Lcae2dlDW4fI1xOTri+MgcrkNdcrmlG31+WMOO4hivRRjMNDTOo5KapqDbtDIndWQ63q5tHD3kHyTBOFxSnFQfg3znnnyOFxrh7HcLLximFVEZccokyXaB/uGn1UeROVRVM8nn5pGOFcFdj/ABBQ4ZCHmGaVvXNIPdiGrjfloLDzITmclNRg5Qe3Zn0D0ju6jgLGCzTLTEDy1CsS3weYm089T57oqmdrmXdsClSK0npWd1V4y3PNbLIZmHOdWvH0CjTSWS++rVNUd+kvwNGSTsbjnOsX7KGFqNTqz9Ve/T8EK+R53c75rThHz3En3NVO49dudvFVzSNFpJ62eT/nLn2v2UehY/8Av/H8D0/+j8V2kSv+UTS7QaeKtPO36EjROPZG6nc81RNeI96xk+CtxWkcRJudjz81KWMGO0k+Jz7/AHFsSJ67c7eKQwVX7fFO86B25uMp3ezSO+6lIxcy0elLBpMX4VkNPF1lTRyNqY2Dd2W4cB72lyg1lF1vUVOopMqHBeH8exIRNwrCJLBxtLIMrMp/iOijzyev6zGhFaUlpffLw+2CweF+iyCMx1HE0xqqhk3WMp4pD1LbbX0Bd7jopJHn3F05eCL2O1qeE+HqtwdU4NRSEWsXQjkumXiT0uOdmSsFNDTMDKeJkTBs1jQAhDCNgFkBlACAEBiwQBlCAw6Nr2lr2hzSLEHYocEKHAsLw+tnraKhggqZwGyyRtsXAbITlOUubIHpUB/4HxGNm8gazXzIXUIQc5KKKHipJs8dmaFviF2clg9Cyta3GW3cKmklzMuBcNdz8lXCS3Nt5a1XKO3R/Y3dnldSkDL6Ft/JQ1LUaFb1HbY25fgiTRSD0nNWjWjwvVJ9WjVS0pMxu8bKqpPY1WdpLW8sBTN7UbudfNyHko6/CXeqrjvfr+B+opWFsJzOC5SmW31omo7s1uom5RaQ89wrtZ57svMcpKS1M0Z+Z5eapqT8R69na4orcSpqY9eBnHrDbzXZz2Mlta/y7Pv9zxiNIOusXH0fBdhMje2v8iyzvegqARcUVRuSTSHcfxKzOTzq1DhxyXvYELhnMBoGyDBkNAt5IDKAEAIAQAgBACAEAIAQHJ9J5DeEqgkD9Rm/vRLJbRqcOakijhVntDABHt7Z/ok4bHrWl5qrR5fM81lSQWaM2dzPgqqcTXe3Ek44x/ke4p5OyOIA/T8zyUdKyXRry9XykuX4IieeWx0G3/LK06UfPuvUa5fQXpHzOlflzbcmKqokarOVVze3Q8BsxqzfNfMedk20klGq6++ebHp+0BkWUv8A5lyk0W3sauI4z8zzmqbC/WHfwKu8Jg/n8/oO0zp+ytJzg3PIeKoqaXI9i0dVUN88+y7iFM6briRn9bkPFdko4MtB1OI3v17dzxWmZ1R3nO25kKVPTgqveM6nX6Hc9CDnR8ZSseTaSleBd19iCpbdDz6qml4i/kKAQAgBACAEAIAQAgBACAEAIDk+kyZsHC0zntc4GRgs0eabsvtqip1VJlMsngdUXJ1DdSRquSjLB7lpdUJVk+u4tWVcRLe9ydy8gq6cZGi8uKScfj9je6oiZQE3d6Hh5LiTyXVLmmrVvPTsQE9Wyx1cr9LPnnc0zTSVIzSd0nQfdVVIGm0uI5bwa21R7UbM9d3NJQWkjC5frGy6sZqq42YCzx5rtOmkTvbx+Hw/Uyys/Lvk+qs0GNXv/qP01YOyNGTx+6oqQ8R7NpdLgLYjYaoiR1mXNjz81KUNjHQuk5Pbo/uaaupkdUXDA21typQgsGa7um6r2LL6E8BxObGG4/LH1NA2JzGOdcdcSB6I8PNS2RjnXlOOGXihSCAEAIAQAgBACAEAIAQAgBAaqmGKoidDPE2SN4s5rhcEICq+LOjd1NJNX4K90lO0ZnUrh32eOQ8x5HUeeyk5ZRptJRjVTlsVlXwkT2BvZjhY8rqNM3Xy8Sw+j+uEe6p2Sjf3fUUY+0aLjw2zRAznQq8+ffIxS6Zyqqh6Fn/keYWuMznZTz5eaS5ChFueTbUNcXts0nTwXYPYheJuaWDLGPsQWEfBW5Mji8ciTyGOlbodG3WZ+0e9BcO3T7ISpYyC5ztg0bqU+RjtYYefLB1vRjwtBxJxO818IloKNmeRjtpHeq0+I3uF1PYzXUfE2z6JijZFG2ONoaxos1rRYAIZT0gBACAEAIAQAgBACAEAIAQAgBAeSCSgK74+6Pm4m+TE8HjDavKetgFgJvNvg77+Se410K0fZqrYql3dkmp6l7qd7BldHJFYg221XNLWD0o3VKpCUXLZLZYEKiGBsjAJGm7bkZEbkVOjQ8KzzWeQi2SSFoMLG2c29yNlBrPMlTm6azBc1n6Cjp6thc5srAct7DzN13SmUupWTbTxtk1iorM5PXt1bdEsIhKpVlPLl0GaOor3OaGzs7zcxuF3JKnxZYw1uiStiFTEQ6djgY8xAsNlFKJscridNrUvZB1DVh+WNhkdI0BrY253OdyAHMo2hKjWSb2w4l/9HHCruFsAbDU2NfUu62pLTfK7k2/O21/erDw6k5TeWdchAEAIAQAgBACAEAIAQAgBACAEAIAQAgOb4p4NwriaL/GQmKpA7tVFo9v9R5FdTwOuSssf6NOIqACSgdFiMEfJgDZGj/adD8D7gotbHqUruMnHVs+RAHo94rrmMEOEPLToXzyNiA+BN/ouJdztxVhFaVJP5mZOibjAu/8AT6OxFtKoafRdMfFjndLsMs6GeKXhrr4ZGbWIfO4/Zq4sk3WgvZ+xKUfQpizchnxOhYQLd2JzrfULjTEa9JYzEm6PocZHl7VixeQLflwgafElTwFdJco+XwOz4c4Nwvh+0lLEZKkC3Xy6uA8vBc0pbkKt3Vqx0N+HsdG24Gq6ZjKAEAIAQAgBACAEB//Z",
      brand: "RING",
    },
    {
      id: 2,
      name: "Thảm Phòng Tắm Chất Dàn Hồi Nhiệt Déo XYLIA",
      price: 169000,
      originalPrice: 169000,
      discount: 0,
      image:
        "https://th.bing.com/th/id/OIP.zBEtFIylVSRsAajflAkj-QHaHa?pid=ImgDet&w=184&h=184&c=7&dpr=1.3",
      brand: "XYLIA",
    },
    {
      id: 3,
      name: "Thảm Phòng Tắm Hoa Tiết Sóng Biển DARK MINT",
      price: 239000,
      originalPrice: 239000,
      discount: 0,
      image:
        "https://th.bing.com/th/id/OIP.zBEtFIylVSRsAajflAkj-QHaHa?pid=ImgDet&w=184&h=184&c=7&dpr=1.3",
      brand: "DARK MINT",
    },
    {
      id: 4,
      name: "Cọ Lưng Kèm Bông Tắm Nhựa 2 Đầu SUSANA",
      price: 89000,
      originalPrice: 89000,
      discount: 0,
      image:
        "https://th.bing.com/th/id/OIP.zBEtFIylVSRsAajflAkj-QHaHa?pid=ImgDet&w=184&h=184&c=7&dpr=1.3",
      brand: "SUSANA",
    },
    {
      id: 5,
      name: "Ly Đựng Bàn Chải Nhựa Xanh DARK MINT",
      price: 49000,
      originalPrice: 49000,
      discount: 0,
      image:
        "https://th.bing.com/th/id/OIP.zBEtFIylVSRsAajflAkj-QHaHa?pid=ImgDet&w=184&h=184&c=7&dpr=1.3",
      brand: "DARK MINT",
    },
    {
      id: 6,
      name: "Rèm Tắm DARK MINT L180xW180cm",
      price: 127200,
      originalPrice: 159000,
      discount: 20,
      image:
        "https://th.bing.com/th/id/OIP.zBEtFIylVSRsAajflAkj-QHaHa?pid=ImgDet&w=184&h=184&c=7&dpr=1.3",
      brand: "DARK MINT",
    },
    {
      id: 7,
      name: "Bình Xịt Xà Phòng Nhựa Hồng Hoa tiết cành hoa XING",
      price: 99000,
      originalPrice: 99000,
      discount: 0,
      image:
        "https://th.bing.com/th/id/OIP.zBEtFIylVSRsAajflAkj-QHaHa?pid=ImgDet&w=184&h=184&c=7&dpr=1.3",
      brand: "XING",
    },
    {
      id: 8,
      name: "Thảm Phòng Tắm Chất Dàn Hồi Nhiệt Déo SUSANA",
      price: 135200,
      originalPrice: 169000,
      discount: 20,
      image:
        "https://th.bing.com/th/id/OIP.zBEtFIylVSRsAajflAkj-QHaHa?pid=ImgDet&w=184&h=184&c=7&dpr=1.3",
      brand: "SUSANA",
    },
    {
      id: 9,
      name: "Thảm phòng tắm lông xù màu xanh dương DARK MINT",
      price: 111300,
      originalPrice: 159000,
      discount: 30,
      image:
        "https://th.bing.com/th/id/OIP.zBEtFIylVSRsAajflAkj-QHaHa?pid=ImgDet&w=184&h=184&c=7&dpr=1.3",
      brand: "DARK MINT",
    },
    {
      id: 10,
      name: "Bình Xịt Xà Phòng Nhựa SUSANA",
      price: 79000,
      originalPrice: 79000,
      discount: 0,
      image:
        "https://th.bing.com/th/id/OIP.zBEtFIylVSRsAajflAkj-QHaHa?pid=ImgDet&w=184&h=184&c=7&dpr=1.3",
      brand: "SUSANA",
    },
  ];
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-in-out",
    });
  }, []);
  return (
    <RootLayout>
      <div className="container mx-auto px-4 py-8">
        <Search_Header />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
          {products.map((product, index) => (
            <Product_item product={product} key={index} />
          ))}
        </div>
      </div>
    </RootLayout>
  );
};

export default Search;

import SearchIcon from "@mui/icons-material/Search";
const Search_Header = () => {
  return (
    <div
      className="mb-8 text-center"
      data-aos="fade-down"
      data-aos-duration="800"
    >
      <h1 className="text-4xl font-bold text-red-600 mb-2">Tim kiếm</h1>
      <p className="text-gray-600 mb-6">
        Có <span className="font-medium">20</span> sản phẩm cho tìm kiếm
      </p>

      <div className="w-full max-w-md mx-auto relative">
        <input
          type="text"
          placeholder="Tìm kiếm sản phẩm..."
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          defaultValue="ghế"
        />
        <button className="absolute right-2 top-1/2 -translate-y-1/2">
          <SearchIcon className="h-5 w-5 text-gray-500" />
        </button>
      </div>

      <div className="border-b-2 border-gray-200 w-32 mx-auto mt-6"></div>

      <p className="mt-6 text-left">
        Kết quả tìm kiếm cho "<span className="font-medium">ghế</span>"
      </p>
    </div>
  );
};
