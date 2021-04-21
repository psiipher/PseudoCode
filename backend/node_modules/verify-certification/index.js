
var cheerio = require('cheerio')
var request = require('request')
var verifyUdemyCertificate = function (id) {
    return new Promise((resolve, rejects) => {
        var verificationData = {
            'type': "Udemy"
        };
        try {

            request({

                uri: "https://www.udemy.com/api-2.0/certificates/" + id + "/?fields[certificate]=code,image_url,image_created,pdf_url,locale,completion_date,user,course,facebook_share_url,linkedin_share_url,twitter_share_url&fields[user]=id,title,name,display_name,job_title,image_50x50,image_100x100,initials,url&fields[course]=@default,avg_rating_recent,rating,bestseller_badge_content,badges,content_info,discount,is_recently_published,is_wishlisted,num_published_lectures,num_reviews,num_subscribers,buyable_object_type,free_course_subscribe_url",
            }, function (error, response, body) {
                try {
                    var udemyData = JSON.parse((response.toJSON()).body);

                    verificationData.completionDate = udemyData.completion_date;
                    verificationData.recipientName = udemyData.user.display_name;
                    verificationData.courseName = udemyData.course.title;
                    verificationData.courseUrl = "https://www.udemy.com" + udemyData.course.url;
                    verificationData.courseId = udemyData.course.id;
                    if (udemyData.course.visible_instructors.length > 0)
                        verificationData.instructorName = udemyData.course.visible_instructors[0].display_name
                    else
                        verificationData.instructorName = null;




                    verificationData.isVerified = true;
                    //console.log(JSON.stringify(verificationData));
                    return resolve(verificationData);
                }
                catch (ex) {
                    verificationData.isVerified = false;
                    return resolve(verificationData)
                }
            });
        }
        catch (ex) {
            console.log("Error");
            verificationData.isVerified = false;
            return resolve(verificationData)
        }

    });
}

var verifyCourseraCertificate = function (id) {
    return new Promise((resolve, rejects) => {
        var verificationData = {
            'type': "Coursera"
        };
        try {

            request({

                uri: "https://www.coursera.org/account/accomplishments/verify/" + id
            }, function (error, response, body) {
                var $ = cheerio.load(body);
                $("strong").each(function () {
                    var dom = $(this);


                });
                if ($("h2.course-name").length > 0) {
                    verificationData.isVerified == true
                    verificationData.courseName = $($("h2.course-name")[0]).text();
                    if ($("strong").length > 1) {

                        verificationData.recipientName = $($("strong")[0]).text();
                        verificationData.completionDate = $($("strong")[1]).text();
                    }

                }
                else {
                    verificationData.isVerified = false;
                }

                //console.log(JSON.stringify(verificationData));
                return resolve(verificationData);
            });
        }
        catch (ex) {
            verificationData.isVerified = false;
            return resolve(verificationData)
        }

    });
}

var verifyEdxCertificate = function (id) {
    return new Promise((resolve, rejects) => {
        var verificationData = {
            'type': "Edx"
        };
        try {

            request({

                uri: "https://verify.edx.org/cert/" + id
            }, function (error, response, body) {
                var $ = cheerio.load(body);
                $("strong").each(function () {
                    var dom = $(this);


                });
                if ($("h1").length > 0) {
                    if ($($("h1")[1]).text().includes("This is a valid edX certificate number for")) {

                        if ($("dd").length > 1) {

                            verificationData.recipientName = $($("dd")[0]).text();
                            verificationData.courseName = $($("dd")[2]).text();
                            verificationData.isVerified = true;

                        }
                    }
                    else {
                        verificationData.isVerified = false;
                        return resolve(verificationData);
                    }


                }
                else {
                    verificationData.isVerified = false;
                    return resolve(verificationData);
                }

                return resolve(verificationData);
            });
        }
        catch (ex) {
            verificationData.isVerified = false;
            return resolve(verificationData)
        }

    });
}

var verifyCertificate = function (type, id) {
    return new Promise((resolve, rejects) => {
        switch (type.toLowerCase()) {
            case "udemy": return resolve((verifyUdemyCertificate(id)));
                break;
            case "coursera": return resolve((verifyCourseraCertificate(id)));
                break;
            case "edx": return resolve((verifyEdxCertificate(id)));
                break;
            default: return false;
        }
    });
}


var exportObject={
 verify:verifyCertificate
}

module.exports=exportObject;